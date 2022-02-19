import { useContext } from 'react';

import { CalendarContext, CalendarUpdaterContext } from './Provider';

export const useCalendar = () => {
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
