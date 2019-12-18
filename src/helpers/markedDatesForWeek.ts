import { CalendarDate, MarkedDates } from '../types';

const markedDatesForWeek = (
  week: Array<CalendarDate>,
  markedDates?: MarkedDates
): MarkedDates => {
  if (!markedDates) {
    return {};
  }

  return markedDates;
};

export default markedDatesForWeek;
