import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  FlatList,
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  View,
} from 'react-native';

import { Arrows, Day, DayNames, Month, MonthTitle, Week } from './components';
import { CalendarProps } from './componentTypes';
import { constants, generateDates, monthsData, monthsHeights } from './helpers';
import Locales from './Locales';
import { CalendarDate, CalendarItem, CalendarRef, Locale } from './types';

const defaultViewabilityConfig = {
  itemVisiblePercentThreshold: 1,
};

const keyExtractor = (item: CalendarItem) => item[0];

const Calendar = forwardRef<CalendarRef, CalendarProps>(
  (
    {
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
    },
    ref,
  ) => {
    const flatListRef = useRef<FlatList<CalendarItem>>(null);

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
      [startISODate, endISODate],
    );

    const months = useMemo(() => monthsData(dates), [dates]);

    const initialScrollIndex = useMemo(() => {
      const currentMonth = currentDay.split(/-(?=[^-]+$)/)[0];
      const monthIndex = months.findIndex(([month]) => month === currentMonth);

      return monthIndex > 0 ? monthIndex : 0;
    }, [currentDay, months]);

    const [listWidth, setListWidth] = useState(0);
    const [currentMonthIndex, setCurrentMonthIndex] = useState(initialScrollIndex);

    const getItemLayout = useCallback(
      (data: Array<[string, Array<CalendarDate>]>, index: number) => {
        const monthsLayout = monthsHeights(data, firstDay);
        const currentMonthLayout = monthsLayout[index] || {
          height: 0,
          offset: 0,
        };

        return {
          index,
          length: horizontal ? listWidth : currentMonthLayout.height,
          offset: horizontal ? listWidth * index : currentMonthLayout.offset,
        };
      },
      [listWidth, horizontal, firstDay],
    );

    const scrollToIndex = useCallback(
      (index: number, animated?: boolean) => {
        const offset = horizontal
          ? index * listWidth
          : monthsHeights(months, firstDay)[index]?.offset;

        flatListRef.current?.scrollToOffset({
          offset,
          animated: animated || scrollEnabled,
        });
      },
      [listWidth, scrollEnabled, horizontal, months, firstDay],
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
      [listWidth],
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
      [months.length, onArrowPress, scrollToIndex, currentMonthIndex],
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
      [onMomentumScrollEnd, currentMonthIndex, listWidth],
    );

    const handleScrollTo = useCallback(
      (monthString: string, animated?: boolean) => {
        const monthIndex = months.findIndex(([month]) => month === monthString);

        scrollToIndex(monthIndex, animated);
      },
      [months, scrollToIndex],
    );

    useImperativeHandle(ref, () => ({ scrollTo: handleScrollTo }), [handleScrollTo]);

    const renderMonth = ({
      item: [month, dates],
      index,
    }: {
      item: [string, Array<CalendarDate>];
      index: number;
    }) => (
      <Month
        Day={DayComponent}
        DayNames={DayNamesComponent}
        MonthTitle={MonthTitleComponent}
        Week={WeekComponent}
        calendarKey={`${startISODate}-${endISODate}`}
        dates={dates}
        firstDay={firstDay}
        hideExtraDays={hideExtraDays}
        horizontal={horizontal}
        index={index}
        listWidth={listWidth}
        locales={locales}
        markedDates={markedDates}
        month={month}
        months={months}
        onDayPress={onDayPress}
        theme={theme}
      />
    );

    return (
      <View onLayout={handleLayoutChange} style={styles.container}>
        {!!listWidth && (
          <>
            <FlatList
              data={months}
              // @ts-expect-error
              getItemLayout={getItemLayout}
              horizontal={horizontal}
              initialNumToRender={1}
              initialScrollIndex={initialScrollIndex}
              keyExtractor={keyExtractor}
              pagingEnabled={horizontal}
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
  },
);

export default React.memo(Calendar);

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});
