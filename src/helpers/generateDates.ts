import { CalendarDate } from '../types';

import constants from './constants';

export default ({
  startISODate,
  endISODate,
}: {
  startISODate: string;
  endISODate: string;
}): Array<CalendarDate> => {
  const startDate = new Date(startISODate);
  const endDate = new Date(endISODate);

  const diffInDays =
    (endDate.getTime() - startDate.getTime()) / constants.dayInMs;
  const dates = [];
  let addition = 0;

  for (let index = 0; index <= diffInDays; index++) {
    const nextDay = startDate.getTime() + addition;
    startDate.setTime(nextDay);

    const dayString = startDate.toISOString().replace(/T.*/, '');
    const [year, month, day] = dayString.split('-');

    dates[index] = {
      // get rid of `0` prefix
      day: parseInt(day).toString(),
      dayString,
      year,
      month,
      dayOfWeek: startDate.getDay(),
    };

    // Do not add day on first loop
    addition = constants.dayInMs;
  }

  return dates;
};
