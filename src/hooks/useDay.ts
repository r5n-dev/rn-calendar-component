import { useCallback, useMemo } from 'react';

import {
  CalendarDataState,
  MarkedDatesState,
  useCalendarConfig,
  useCalendarData,
  useCallbacksState,
  useMarkedDates,
} from '../store';

const isInSeries =
  (prevDayString?: string) =>
  ({ markedDates }: MarkedDatesState) =>
    prevDayString ? markedDates[prevDayString]?.inSeries : false;

const selectDayString =
  (dayIndex: number) =>
  ({ dates }: CalendarDataState) =>
    dates[dayIndex]?.dayString;

const useDay = (dayString: string, dayIndex: number) => {
  const onDayPress = useCallbacksState((state) => state.onDayPress);

  const prevDayString = useCalendarData(selectDayString(dayIndex - 1));
  const nextDayString = useCalendarData(selectDayString(dayIndex + 1));
  const prevInSeries = useMarkedDates(isInSeries(prevDayString));
  const nextInSeries = useMarkedDates(isInSeries(nextDayString));

  const today = useMarkedDates(
    useCallback(({ markedDates }) => markedDates[dayString], [dayString]),
  );

  const { dayTheme, listWidth } = useCalendarConfig(
    useCallback(({ theme, listWidth }) => ({ listWidth, dayTheme: theme?.day }), []),
  );

  const { startingDay, endingDay, inSeries } = today || {};
  const dayInSeries = inSeries && (prevInSeries || nextInSeries);

  return useMemo(
    () => ({
      ...(today && today),
      dayTheme,
      endingDay: dayInSeries && (!nextInSeries || endingDay),
      inSeries: dayInSeries,
      listWidth,
      onDayPress,
      startingDay: dayInSeries && (!prevInSeries || startingDay),
    }),
    [
      dayInSeries,
      dayTheme,
      endingDay,
      listWidth,
      nextInSeries,
      onDayPress,
      prevInSeries,
      startingDay,
      today,
    ],
  );
};

export default useDay;
