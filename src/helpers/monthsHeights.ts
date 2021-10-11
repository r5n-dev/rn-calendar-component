import { CalendarDate } from '../types';

import constants from './constants';

let cachedMonths: {
  data: Array<{ height: number; offset: number }>;
  firstDay: BinaryBoolean;
} = {
  data: [],
  firstDay: 0,
};

const monthsHeights = (
  monthsData: Array<[string, Array<CalendarDate>]>,
  firstDay: BinaryBoolean,
) => {
  if (cachedMonths.firstDay === firstDay && monthsData.length === cachedMonths.data.length) {
    return cachedMonths.data;
  }

  const data = monthsData.reduce((acc, [_month, data]) => {
    const firstDay = data[0];
    const lastDay = data[data.length - 1];
    const firstWeekDaysCount = constants.weekLength - firstDay.dayOfWeek;
    const lastWeekDaysCount = lastDay.dayOfWeek + 1;
    const weeksCount =
      2 + (data.length - firstWeekDaysCount - lastWeekDaysCount) / constants.weekLength;

    const height = weeksCount * constants.touchableSize + constants.monthHeaderHeight;
    const offset = acc.reduce((acc, { height }) => (acc += height), 0);
    acc.push({ height, offset });

    return acc;
  }, [] as Array<{ height: number; offset: number }>);

  cachedMonths = { data, firstDay };
  return data;
};

export default monthsHeights;
