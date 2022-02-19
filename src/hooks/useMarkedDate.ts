import { useCalendar } from '../context/hooks';
import { MarkedDate } from '../types';

export const useMarkedDate = (dayString: string) => {
  const { markedDates } = useCalendar();

  return markedDates ? markedDates[dayString] : ({} as MarkedDate);
};
