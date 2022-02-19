import { useContext } from 'react';

import { CalendarContext, CalendarUpdaterContext } from '../context/Provider';
import { fillDates } from '../helpers/fillDates';
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
  const { theme } = useCalendar();
  return theme?.[themeKey];
};

export const useCalendarSettings = () => {
  const { horizontal, firstDay, months, listWidth } = useCalendar();

  return { horizontal, firstDay, months, listWidth };
};

export const useArrow = () => {
  const { onArrowPress, listWidth, months } = useCalendar();

  return { onArrowPress, listWidth, months };
};

export const useDay = (day: string) => {
  const { markedDates, theme, listWidth, onDayPress } = useCalendar();
  const { extraDay, selected, color, inSeries, startingDay, endingDay, dots } = markedDates
    ? markedDates[day]
    : ({} as MarkedDate);

  return {
    theme,
    listWidth,
    onDayPress,
    extraDay,
    selected,
    color,
    inSeries,
    startingDay,
    endingDay,
    dots,
  };
};

export const useMonth = (monthIndex: number) => {
  const { showExtraDays, dates, firstDay, months, horizontal, locale, listWidth } = useCalendar();

  const monthDates = fillDates({
    dates,
    showExtraDays,
    firstDay,
    monthIndex,
    months,
  });

  return { monthDates, horizontal, locale, listWidth };
};
