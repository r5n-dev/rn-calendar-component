import type { CalendarDate } from '../types';

type FillDatesParams = {
  dates: Array<CalendarDate>;
  firstDay: number;
  showExtraDays?: boolean;
  monthIndex: number;
  months: Array<[string, Array<CalendarDate>]>;
};

const maxDayIndex = 6;

export const fillDates = ({
  dates,
  firstDay,
  monthIndex,
  showExtraDays,
  months,
}: FillDatesParams): Array<CalendarDate> => {
  const [, previousMonthDates] = months[monthIndex - 1] || [];
  const [, nextMonthDates] = months[monthIndex + 1] || [];

  const firstDate = dates[0];
  const startDayCap = firstDate.dayOfWeek - firstDay;

  const fillCap = startDayCap >= 0 ? startDayCap : maxDayIndex;
  const lastDate = dates[dates.length - 1];
  const endDayCap = maxDayIndex - lastDate.dayOfWeek + firstDay;

  if (showExtraDays) {
    const startFillCap =
      startDayCap >= 0
        ? previousMonthDates?.length - startDayCap
        : previousMonthDates?.length - maxDayIndex;

    const startFillDates = (
      previousMonthDates ? previousMonthDates.slice(startFillCap) : Array(fillCap).fill({})
    ).map((item) => ({ ...item, extraDay: true }));

    const endFillDates = (nextMonthDates ? nextMonthDates.slice(0, endDayCap) : []).map((item) => ({
      ...item,
      extraDay: true,
    }));

    return [...startFillDates, ...dates, ...endFillDates];
  } else {
    return [
      ...Array(fillCap).fill({}),
      ...dates,
      ...Array(maxDayIndex - lastDate.dayOfWeek + 1).fill({}),
    ];
  }
};
