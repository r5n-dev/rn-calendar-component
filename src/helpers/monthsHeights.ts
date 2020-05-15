import { CalendarDate } from '../types';
import constants from './constants';

let cachedMonths: Array<{ height: number; offset: number }> = [];

const monthsHeights = (monthsData: Array<[string, Array<CalendarDate>]>) => {
  if (monthsData.length === cachedMonths.length) {
    return cachedMonths;
  }

  const data = monthsData.reduce((acc, [_month, data]) => {
    const firstDay = data[0];
    const firstWeekDaysCount = constants.weekLength - firstDay.dayOfWeek;
    const restWeeksCount = data.slice(firstWeekDaysCount).length / 7;
    const lastWeekDaysCount = restWeeksCount % 7;
    const weeksCount =
      1 + Math.floor(restWeeksCount) + Number(lastWeekDaysCount > 0);
    const height =
      weeksCount * constants.touchableSize + constants.monthHeaderHeight;
    const offset = acc.reduce((acc, { height }) => (acc += height), 0);
    acc.push({ height, offset });

    return acc;
  }, [] as Array<{ height: number; offset: number }>);

  cachedMonths = data;
  return data;
};

export default monthsHeights;
