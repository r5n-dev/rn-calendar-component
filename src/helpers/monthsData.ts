import type { CalendarDate } from '../types';

const monthsData = (dates: CalendarDate[]) => {
  const parsedDates = dates.reduce((acc: { [key: string]: CalendarDate[] }, date: CalendarDate) => {
    const monthKey = `${date.year}-${date.month}`;
    const month = acc[monthKey] || [];
    acc[monthKey] = [...month, date];
    return acc;
  }, {});

  return Object.entries<CalendarDate[]>(parsedDates);
};

export default monthsData;
