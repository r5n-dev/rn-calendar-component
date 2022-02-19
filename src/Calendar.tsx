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
  FlatListProps,
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

import { Arrows, Month } from './components';
import { useCalendar, useCalendarDispatch } from './context/hooks';
import { monthsHeights } from './helpers';
import { CalendarDate, CalendarItem, CalendarRef, PickedFlatListProps } from './types';

type CalendarProps = Pick<FlatListProps<Inexpressible>, PickedFlatListProps> & {
  calendarHeight: number;
  currentDay: string;
  showArrows?: boolean;
  style?: StyleProp<ViewStyle>;
};

const keyExtractor = (item: CalendarItem) => item[0];

const Calendar = forwardRef<CalendarRef, CalendarProps>(
  (
    { calendarHeight, currentDay, showArrows, onMomentumScrollEnd, style, ...flatListProps },
    ref,
  ) => {
    const calendarDispatch = useCalendarDispatch();
    const { horizontal, firstDay, months, listWidth } = useCalendar();
    const flatListRef = useRef<FlatList<CalendarItem>>(null);

    const initialScrollIndex = useMemo(() => {
      const currentMonth = currentDay.split(/-(?=[^-]+$)/)[0];
      const monthIndex = months.findIndex(([month]) => month === currentMonth);

      return monthIndex > 0 ? monthIndex : 0;
    }, [currentDay, months]);

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

        flatListRef.current?.scrollToOffset({ offset, animated });
      },
      [firstDay, horizontal, listWidth, months],
    );

    const handleLayoutChange = useCallback(
      ({
        nativeEvent: {
          layout: { width },
        },
      }: LayoutChangeEvent) => {
        if (listWidth !== width) {
          calendarDispatch({ type: 'setListWidth', payload: width });
        }
      },
      [calendarDispatch, listWidth],
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
      item: [month],
      index,
    }: {
      item: [string, Array<CalendarDate>];
      index: number;
    }) => <Month index={index} month={month} />;

    return (
      <View onLayout={handleLayoutChange} style={styles.container}>
        {horizontal && showArrows && (
          <Arrows
            currentMonthIndex={currentMonthIndex}
            leftArrowDisabled={currentMonthIndex === 0}
            rightArrowDisabled={currentMonthIndex === months.length - 1}
            scrollToIndex={scrollToIndex}
            setCurrentMonthIndex={setCurrentMonthIndex}
          />
        )}

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
              style={[style, { maxHeight: calendarHeight }]}
              windowSize={11}
              {...(horizontal && {
                onMomentumScrollEnd: handleMomentumScrollEnd,
              })}
              {...flatListProps}
            />
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
