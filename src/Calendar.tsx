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
  DayComponentProps,
  DayNamesComponentProps,
  MonthTitleComponentProps,
} from './types';

import { generateDates, constants } from './helpers';
import { DayNames, Day, MonthTitle } from './components';
import Locales from './Locales';
import chunk from './helpers/chunk';

type Props = {
  DayComponent?: NamedExoticComponent<DayComponentProps>;
  DayNamesComponent?: NamedExoticComponent<DayNamesComponentProps>;
  MonthTitleComponent?: NamedExoticComponent<MonthTitleComponentProps>;

  // key should match pattern `YYYY-MM-DD`
  markedDates?: { [key: string]: {} };
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

export const Calendar = ({
  DayComponent = Day,
  DayNamesComponent = DayNames,
  MonthTitleComponent = MonthTitle,

  currentDay = todayDate,
  endISODate,
  calendarHeight = 360,
  firstDay = 0,
  locale = 'default',
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
    return (
      <View style={{ flexDirection: 'row' }}>
        {week.map((item, index) => (
          <DayComponent
            today={item.dayString === todayDate}
            key={item ? item.dayString : `${index}`}
            onPress={onDayPress}
            {...item}
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
