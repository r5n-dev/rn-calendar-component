import { useCallback, useContext, useMemo } from 'react';

import { CalendarContext, CalendarUpdaterContext } from '../context/Provider';
import { fillDates } from '../helpers/fillDates';
import { useCalendarConfig, useDates, useMarkedDates, useMonths } from '../store';
import type { CalendarTheme, MarkedDate } from '../types';

const useCalendar = () => {
  const CalendarState = useContext(CalendarContext);
  if (typeof CalendarState === 'undefined') {
    throw new Error('useCalendar must be used within a CalendarProvider');
  }
  return CalendarState;
};

export const useCalendarDispatch = () => {
  const CalendarUpdaterDispatch = useContext(CalendarUpdaterContext);
  if (typeof CalendarUpdaterDispatch === 'undefined') {
    throw new Error('useCalendarDispatch must be used within a CalendarProvider');
  }
  return CalendarUpdaterDispatch;
};

export const useTheme = <T extends keyof CalendarTheme>(themeKey: T) => {
  const theme = useCalendarConfig(useCallback((state) => state.theme?.[themeKey], [themeKey]));
  return theme;
};

export const useArrow = () => {
  const { onArrowPress } = useCalendar();
  const listWidth = useCalendarConfig().listWidth;

  return { onArrowPress, listWidth };
};

export const useDay = (day: string) => {
  const markedDate = useMarkedDates(useCallback((state) => state.markedDates[day], [day]));
  const { dayTheme, listWidth } = useCalendarConfig(
    useCallback(({ theme, listWidth }) => ({ listWidth, dayTheme: theme?.day }), []),
  );
  const { onDayPress } = useCalendar();
  const { extraDay, selected, color, inSeries, startingDay, endingDay, dots } =
    markedDate || ({} as MarkedDate);

  return useMemo(
    () => ({
      dayTheme,
      listWidth,
      onDayPress,
      extraDay,
      selected,
      color,
      inSeries,
      startingDay,
      endingDay,
      dots,
    }),
    [
      dayTheme,
      listWidth,
      onDayPress,
      extraDay,
      selected,
      color,
      inSeries,
      startingDay,
      endingDay,
      dots,
    ],
  );
};

export const useMonth = (monthIndex: number) => {
  const { showExtraDays, firstDay, horizontal, locale, listWidth } = useCalendarConfig();
  const months = useMonths((state) => state.months);
  const dates = useDates((state) => state.dates);

  const monthDates = useMemo(
    () =>
      fillDates({
        dates,
        showExtraDays,
        firstDay,
        monthIndex,
        months,
      }),
    [dates, firstDay, monthIndex, months, showExtraDays],
  );

  return { monthDates, horizontal, locale, listWidth };
};
