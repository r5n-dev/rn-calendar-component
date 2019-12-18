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
} from './types';

import { generateDates, constants, chunk, markedDatesForWeek } from './helpers';
import { DayNames, Day, MonthTitle } from './components';
import Locales from './Locales';

type Props = {
  DayComponent?: NamedExoticComponent<DayComponentProps>;
  DayNamesComponent?: NamedExoticComponent<DayNamesComponentProps>;
  MonthTitleComponent?: NamedExoticComponent<MonthTitleComponentProps>;

  // key should match pattern `YYYY-MM-DD`
  markedDates?: MarkedDates;
  calendarHeight?: number;
  currentDay?: string;
  endISODate: string;
  firstDay?: 0 | 1;
  locale?: string;
  onDayPress?: (date: Omit<CalendarDate, 'dayOfWeek'>) => void;
  startISODate: string;
  style?: FixMe;
  viewabilityConfig?: ViewabilityConfig;
};

const todayDate = new Date().toISOString().split('T')[0];

const Calendar = ({
  DayComponent = Day,
  DayNamesComponent = DayNames,
  MonthTitleComponent = MonthTitle,

  calendarHeight = 360,
  currentDay = todayDate,
  endISODate,
  firstDay = 0,
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
    const weekKey = week.find(({ dayString }) => dayString) as CalendarDate;

    const weekMarkedDatesProps = markedDatesForWeek(week, markedDates);

    return (
      <View key={weekKey.dayString} style={{ flexDirection: 'row' }}>
        {week.map((item, index) => (
          <DayComponent
            key={item.dayString ? item.dayString : `${index}`}
            onPress={onDayPress}
            {...item}
            {...(weekMarkedDatesProps[item.dayString] || {})}
          />
        ))}
      </View>
    );
  };

  const renderMonth = ({
    item: [month, dates],
  }: {
    item: [string, Array<CalendarDate>];
  }) => {
    const { dayOfWeek } = dates[0];
    const dayCap = dayOfWeek - firstDay;
    const fillCap = dayCap >= 0 ? dayCap : 6;

    const weeks = chunk(
      [...Array(fillCap).fill({}), ...dates],
      constants.weekLength
    );
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
      renderItem={renderMonth}
      style={[{ maxHeight: calendarHeight }, style]}
      viewabilityConfig={viewabilityConfig}
      windowSize={3}
      // @ts-ignore
      ref={flatListRef}
      {...flatListProps}
    />
  );
};

export default Calendar;
