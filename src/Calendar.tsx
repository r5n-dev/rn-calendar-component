import React, { useRef, useCallback, useMemo } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';

import { CalendarDate, Locale, CalendarItem } from './types';
import { CalendarProps } from './componentTypes';

import {
  chunk,
  constants,
  fillDates,
  generateDates,
  markedDatesForWeek,
} from './helpers';
import { DayNames, Day, MonthTitle, Week } from './components';
import Locales from './Locales';

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
  theme,
  viewabilityConfig = {
    itemVisiblePercentThreshold: 1,
  },
  ...flatListProps
}: CalendarProps) => {
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
        dayTheme={theme?.day}
        key={firstWeekDay.dayString}
        markedDates={weekMarkedDatesProps}
        onDayPress={onDayPress}
        theme={theme?.week}
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
          theme={theme?.monthTitle}
          title={`${locales.monthNames[Number(monthString) - 1]} ${year}`}
        />

        <DayNamesComponent
          dayNames={locales.dayNamesShort}
          theme={theme?.dayNames}
        />

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
      style={[styles.container, style, { maxHeight: calendarHeight }]}
      viewabilityConfig={viewabilityConfig}
      windowSize={11}
      {...flatListProps}
    />
  );
};

export default Calendar;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});
