import React, {
  useRef,
  useCallback,
  useMemo,
  NamedExoticComponent,
} from 'react';
import { View, FlatList, ViewabilityConfig } from 'react-native';

import {
  CalendarDate,
  Locale,
  CalendarItem,
  MarkedDates,
  DayComponentProps,
  DayNamesComponentProps,
  MonthTitleComponentProps,
  WeekComponentProps,
} from './types';

import {
  chunk,
  constants,
  fillDates,
  generateDates,
  markedDatesForWeek,
} from './helpers';
import { DayNames, Day, MonthTitle, Week } from './components';
import Locales from './Locales';

type Props = {
  DayComponent?: NamedExoticComponent<DayComponentProps>;
  DayNamesComponent?: NamedExoticComponent<DayNamesComponentProps>;
  MonthTitleComponent?: NamedExoticComponent<MonthTitleComponentProps>;
  WeekComponent?: NamedExoticComponent<WeekComponentProps>;

  // key should match pattern `YYYY-MM-DD`
  calendarHeight?: number;
  currentDay?: string;
  endISODate: string;
  firstDay?: 0 | 1;
  hideExtraDays?: boolean;
  locale?: string;
  markedDates?: MarkedDates;
  onDayPress?: (date: Omit<CalendarDate, 'dayOfWeek'>) => void;
  startISODate: string;
  style?: FixMe;
  viewabilityConfig?: ViewabilityConfig;
};

const Calendar = ({
  DayComponent = Day,
  DayNamesComponent = DayNames,
  MonthTitleComponent = MonthTitle,
  WeekComponent = Week,

  calendarHeight = 360,
  currentDay = constants.todayDate,
  endISODate,
  firstDay = 0,
  hideExtraDays = true,
  locale = 'default',
  markedDates,
  onDayPress,
  startISODate,
  style,
  viewabilityConfig = {
    itemVisiblePercentThreshold: 1,
  },
  ...flatListProps
}: Props) => {
  const flatListRef = useRef<FlatList<CalendarItem>>();

  const getItemLayout = useCallback(
    (_data: NotWorthIt, index: number) => ({
      index,
      length: calendarHeight,
      offset: calendarHeight * index,
    }),
    [calendarHeight]
  );

  const locales: Locale = useMemo(() => {
    let selectedLocale = { ...Locales[locale] };

    if (firstDay) {
      const [dayName, ...restDayNames] = selectedLocale.dayNames;
      const [dayNameShort, ...restDayNamesShort] = selectedLocale.dayNamesShort;

      selectedLocale = {
        ...selectedLocale,
        dayNames: [...restDayNames, dayName],
        dayNamesShort: [...restDayNamesShort, dayNameShort],
      };
    }

    return selectedLocale;
  }, [firstDay, locale]);

  const dates = useMemo(
    () =>
      generateDates({
        startISODate,
        endISODate,
      }),
    [startISODate, endISODate]
  );

  const months = useMemo(
    () =>
      Object.entries<Array<CalendarDate>>(
        dates.reduce(
          (acc: { [key: string]: Array<CalendarDate> }, date: CalendarDate) => {
            const monthKey = `${date.year}-${date.month}`;
            const month = acc[monthKey] || [];
            acc[monthKey] = [...month, date];
            return acc;
          },
          {}
        )
      ),
    [dates]
  );

  const initialScrollIndex = useMemo(() => {
    const currentMonth = currentDay.split(/-(?=[^-]+$)/)[0];
    const monthIndex = months.findIndex(([month]) => month === currentMonth);

    return monthIndex > 0 ? monthIndex : 0;
  }, [currentDay, months]);

  const renderWeek = (week: Array<CalendarDate>) => {
    const firstWeekDay = week.find(
      ({ dayString }) => dayString
    ) as CalendarDate;

    const weekMarkedDatesProps = markedDatesForWeek(week, markedDates);

    return (
      <WeekComponent
        DayComponent={DayComponent}
        key={firstWeekDay.dayString}
        markedDates={weekMarkedDatesProps}
        onDayPress={onDayPress}
        week={week}
      />
    );
  };

  const renderMonth = ({
    item: [month, dates],
    index,
  }: {
    item: [string, Array<CalendarDate>];
    index: number;
  }) => {
    const monthDates = fillDates({
      hideExtraDays,
      firstDay,
      dates,
      monthIndex: index,
      months,
    });

    const weeks = chunk(monthDates, constants.weekLength);
    const [year, monthString] = month.split('-');

    return (
      <View key={month}>
        <MonthTitleComponent
          title={`${locales.monthNames[Number(monthString) - 1]} ${year}`}
        />

        <DayNamesComponent dayNames={locales.dayNamesShort} />

        {weeks.map(renderWeek)}
      </View>
    );
  };

  return (
    <FlatList
      data={months}
      getItemLayout={getItemLayout}
      initialNumToRender={1}
      initialScrollIndex={initialScrollIndex}
      keyExtractor={([month]) => month}
      // @ts-ignore
      ref={flatListRef}
      renderItem={renderMonth}
      style={[{ maxHeight: calendarHeight }, style]}
      viewabilityConfig={viewabilityConfig}
      windowSize={11}
      {...flatListProps}
    />
  );
};

export default Calendar;
