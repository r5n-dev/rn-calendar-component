import { CalendarDate } from '../types';
import constants from './constants';

let cachedMonths: Array<{ height: number }> = [];

const monthsHeights = (monthsData: Array<[string, Array<CalendarDate>]>) => {
  if (monthsData.length === cachedMonths.length) {
    return cachedMonths;
  }

  const data = monthsData.map(([_month, data]) => {
    const firstDay = data[0];
    const firstWeekDaysCount = constants.weekLength - firstDay.dayOfWeek;
    const restWeeksCount = data.slice(firstWeekDaysCount).length / 7;
    const lastWeekDaysCount = restWeeksCount % 7;
    const weeksCount =
      1 + Math.floor(restWeeksCount) + Number(lastWeekDaysCount > 0);
    return {
      height:
        weeksCount * constants.touchableSize + constants.monthHeaderHeight,
    };
  });
  cachedMonths = data;
  return data;
};

export default monthsHeights;
