import React, { useState, useRef, useCallback, useMemo } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  NativeSyntheticEvent,
  NativeScrollEvent,
  LayoutChangeEvent,
} from 'react-native';

import { CalendarDate, Locale, CalendarItem } from './types';
import { CalendarProps } from './componentTypes';

import {
  chunk,
  constants,
  fillDates,
  generateDates,
  markedDatesForWeek,
} from './helpers';
import { Arrows, DayNames, Day, MonthTitle, Week } from './components';
import Locales from './Locales';

const defaultViewabilityConfig = {
  itemVisiblePercentThreshold: 1,
};

const keyExtractor = ([item, _data]: [string, Array<CalendarDate>]) => item;

const Calendar = ({
  ArrowsComponent = Arrows,
  DayComponent = Day,
  DayNamesComponent = DayNames,
  MonthTitleComponent = MonthTitle,
  WeekComponent = Week,

  calendarHeight = 360,
  currentDay = constants.todayDate,
  endISODate,
  firstDay = 0,
  hideArrows = true,
  hideExtraDays = true,
  horizontal,
  locale = 'en',
  markedDates,
  onArrowPress,
  onDayPress,
  onMomentumScrollEnd,
  scrollEnabled = true,
  startISODate,
  style,
  theme,
  viewabilityConfig,
  ...flatListProps
}: CalendarProps) => {
  const flatListRef = useRef<FlatList<CalendarItem>>();
  const locales: Locale = useMemo(() => {
    let selectedLocale = { ...(Locales[locale] || Locales.defaultLocale) };

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

  const [listWidth, setListWidth] = useState(0);
  const [currentMonthIndex, setCurrentMonthIndex] = useState(
    initialScrollIndex
  );

  const getItemLayout = useCallback(
    (_data: NotWorthIt, index: number) => ({
      index,
      length: horizontal ? listWidth : calendarHeight,
      offset: (horizontal ? listWidth : calendarHeight) * index,
    }),
    [calendarHeight, listWidth]
  );

  const scrollToIndex = useCallback(
    (index: number) => {
      flatListRef.current?.scrollToOffset({
        offset: index * listWidth,
        animated: scrollEnabled,
      });
    },
    [listWidth, scrollEnabled]
  );

  const handleLayoutChange = useCallback(
    ({
      nativeEvent: {
        layout: { width },
      },
    }: LayoutChangeEvent) => {
      if (listWidth !== width) {
        setListWidth(width);
      }
    },
    [listWidth, scrollToIndex]
  );

  const handleArrowPress = useCallback(
    (direction: 'left' | 'right') => {
      onArrowPress?.({
        direction,
        currentMonthIndex,
        lastMonthIndex: months.length - 1,
      });

      if (direction === 'left') {
        const nextMonthIndex = currentMonthIndex - 1;

        if (nextMonthIndex >= 0) {
          setCurrentMonthIndex(nextMonthIndex);
          scrollToIndex(nextMonthIndex);
        }
      } else if (direction === 'right') {
        const nextMonthIndex = currentMonthIndex + 1;

        if (nextMonthIndex < months.length) {
          setCurrentMonthIndex(nextMonthIndex);
          scrollToIndex(nextMonthIndex);
        }
      }
    },
    [listWidth, currentMonthIndex]
  );

  const handleMomentumScrollEnd = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      onMomentumScrollEnd?.(event);

      const { x } = event.nativeEvent.contentOffset;
      const nextMonthIndex = Math.floor(x / listWidth);
      if (nextMonthIndex !== currentMonthIndex) {
        setCurrentMonthIndex(nextMonthIndex);
      }
    },
    [currentMonthIndex, listWidth]
  );

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
        listWidth={listWidth}
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
      <View key={month} style={horizontal && { width: listWidth }}>
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
    <View onLayout={handleLayoutChange} style={styles.container}>
      {!!listWidth && (
        <>
          <FlatList
            data={months}
            getItemLayout={getItemLayout}
            horizontal={horizontal}
            initialNumToRender={1}
            initialScrollIndex={initialScrollIndex}
            keyExtractor={keyExtractor}
            pagingEnabled={horizontal}
            // @ts-ignore
            ref={flatListRef}
            renderItem={renderMonth}
            scrollEnabled={scrollEnabled}
            style={[style, { maxHeight: calendarHeight }]}
            viewabilityConfig={viewabilityConfig || defaultViewabilityConfig}
            windowSize={11}
            {...(horizontal && {
              onMomentumScrollEnd: handleMomentumScrollEnd,
            })}
            {...flatListProps}
          />

          {horizontal && !hideArrows && (
            <ArrowsComponent
              leftArrowDisabled={currentMonthIndex === 0}
              listWidth={listWidth}
              onArrowPress={handleArrowPress}
              rightArrowDisabled={currentMonthIndex === months.length - 1}
            />
          )}
        </>
      )}
    </View>
  );
};

export default Calendar;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});
