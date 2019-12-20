import { CalendarDate } from '../types';

type FillDatesParams = {
  hideExtraDays: boolean;
  firstDay: number;
  monthIndex: number;
  months: Array<[string, Array<CalendarDate>]>;
  dates: Array<CalendarDate>;
};

const cachedMonths: { [key: string]: Array<CalendarDate> } = {};
const maxDayIndex = 6;

const fillDates = ({
  hideExtraDays,
  dates,
  months,
  monthIndex,
  firstDay,
}: FillDatesParams): Array<CalendarDate> => {
  const [, previousMonthDates] = months[monthIndex - 1] || [];
  const [, nextMonthDates] = months[monthIndex + 1] || [];

  const firstDate = dates[0];
  const startDayCap = firstDate.dayOfWeek - firstDay;

  const fillCap = startDayCap >= 0 ? startDayCap : maxDayIndex;

  if (hideExtraDays) {
    return [...Array(fillCap).fill({}), ...dates];
  } else {
    const startFillCap =
      startDayCap >= 0
        ? previousMonthDates?.length - startDayCap
        : previousMonthDates?.length - maxDayIndex;

    const startFillDates = (previousMonthDates
      ? previousMonthDates.slice(startFillCap)
      : Array(fillCap).fill({})
    ).map(item => ({ ...item, extraDay: true }));

    const lastDate = dates[dates.length - 1];

    const endDayCap = maxDayIndex - lastDate.dayOfWeek + firstDay;

    const endFillDates = (nextMonthDates
      ? nextMonthDates.slice(0, endDayCap)
      : []
    ).map(item => ({ ...item, extraDay: true }));

    return [...startFillDates, ...dates, ...endFillDates];
  }
};

export default ({
  hideExtraDays,
  dates,
  months,
  monthIndex,
  firstDay,
}: FillDatesParams) => {
  const cachedMonth =
    cachedMonths[`${monthIndex}-${firstDay}-${hideExtraDays}`];

  if (cachedMonth) {
    return cachedMonth;
  } else {
    const monthDates = fillDates({
      dates,
      months,
      monthIndex,
      firstDay,
      hideExtraDays,
    });
    cachedMonths[`${monthIndex}-${firstDay}-${hideExtraDays}`] = monthDates;
    return monthDates;
  }
};
