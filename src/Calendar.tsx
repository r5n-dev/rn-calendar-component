import React, { useRef, useCallback, useMemo } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';

import { CalendarDate, Locale, CalendarItem } from './types';

import { generateDates } from './helpers';
import { DayNames, Day } from './components';
import Locales from './Locales';

type Props = {
  DayComponent?: FixMe;
  calendarHeight?: number;
  currentDay?: string;
  endISODate: string;
  firstDay?: 0 | 1;
  locale?: string;
  onDayPress?: (date: CalendarDate) => void;
  startISODate: string;
};

const currentDate = new Date().toISOString().split('T')[0];

export const Calendar = ({
  DayComponent = Day,
  currentDay = currentDate,
  endISODate,
  calendarHeight = 320,
  firstDay = 0,
  locale = 'default',
  onDayPress,
  startISODate,
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
    const selectedLocale = { ...Locales[locale] };

    if (firstDay) {
      selectedLocale.dayNames.push(selectedLocale.dayNames.shift() || '');
      selectedLocale.dayNamesShort.push(
        selectedLocale.dayNamesShort.shift() || ''
      );
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

  const renderMonth = ({
    item: [month, dates],
  }: {
    item: [string, Array<CalendarDate>];
  }) => {
    const { dayOfWeek } = dates[0];
    const fillCap = dayOfWeek - firstDay;
    const data = [...Array(fillCap > 0 ? fillCap : 0).fill({}), ...dates];
    const [year, monthString] = month.split('-');

    return (
      <View key={month}>
        <Text style={styles.monthName}>
          {`${locales.monthNames[Number(monthString) - 1]} ${year}`}
        </Text>
        <DayNames dayNames={locales.dayNamesShort} />

        <FlatList
          listKey={month}
          data={data}
          numColumns={7}
          scrollEnabled={false}
          keyExtractor={({ dayString }) => dayString}
          renderItem={({ item }) => (
            <DayComponent onPress={onDayPress} {...item} />
          )}
        />
      </View>
    );
  };

  return (
    <FlatList
      data={months}
      initialNumToRender={1}
      keyExtractor={([month]) => month}
      initialScrollIndex={initialScrollIndex}
      getItemLayout={getItemLayout}
      maxToRenderPerBatch={1}
      // @ts-ignore
      ref={flatListRef}
      renderItem={renderMonth}
      style={[styles.container, { maxHeight: calendarHeight }]}
      {...flatListProps}
    />
  );
};

const styles = StyleSheet.create({
  container: {},
  monthName: {
    alignSelf: 'center',
  },
});
