import { CalendarDate } from '../types';

const DAY_IN_MS = 1000 * 60 * 60 * 24;

export default ({
  startISODate,
  endISODate,
}: {
  startISODate: string;
  endISODate: string;
}): Array<CalendarDate> => {
  const startDate = new Date(startISODate);
  const endDate = new Date(endISODate);
  const diffInDays = (endDate.getTime() - startDate.getTime()) / DAY_IN_MS;
  const dates = [];
  let addition = 0;

  for (let index = 0; index <= diffInDays; index++) {
    const nextDay = startDate.getTime() + addition;
    startDate.setTime(nextDay);

    const dayString = startDate.toISOString().replace(/T.*/, '');
    const [year, month, day] = dayString.split('-');

    dates[index] = {
      dayString,
      year,
      month,
      day,
      dayOfWeek: startDate.getDay(),
    };

    // Do not add day on first loop
    addition = DAY_IN_MS;
  }
  return dates;
};
