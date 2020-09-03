import { CalendarDate } from '../types';

const monthsData = (dates: Array<CalendarDate>) => {
  const parsedDates = dates.reduce(
    (acc: { [key: string]: Array<CalendarDate> }, date: CalendarDate) => {
      const monthKey = `${date.year}-${date.month}`;
      const month = acc[monthKey] || [];
      acc[monthKey] = [...month, date];
      return acc;
    },
    {}
  );

  return Object.entries<Array<CalendarDate>>(parsedDates);
};

export default monthsData;
