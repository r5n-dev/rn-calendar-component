import { CalendarDate } from '../types';

type FillDatesParams = {
  calendarKey: string;
  dates: Array<CalendarDate>;
  firstDay: number;
  hideExtraDays: boolean;
  monthIndex: number;
  months: Array<[string, Array<CalendarDate>]>;
};

const cachedMonths: { [key: string]: Array<CalendarDate> } = {};
const maxDayIndex = 6;

const fillDates = ({
  dates,
  firstDay,
  hideExtraDays,
  monthIndex,
  months,
}: FillDatesParams): Array<CalendarDate> => {
  const [, previousMonthDates] = months[monthIndex - 1] || [];
  const [, nextMonthDates] = months[monthIndex + 1] || [];

  const firstDate = dates[0];
  const startDayCap = firstDate.dayOfWeek - firstDay;

  const fillCap = startDayCap >= 0 ? startDayCap : maxDayIndex;
  const lastDate = dates[dates.length - 1];
  const endDayCap = maxDayIndex - lastDate.dayOfWeek + firstDay;

  if (hideExtraDays) {
    return [
      ...Array(fillCap).fill({}),
      ...dates,
      ...Array(maxDayIndex - lastDate.dayOfWeek + 1).fill({}),
    ];
  } else {
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
  }
};

export default ({
  calendarKey,
  dates,
  firstDay,
  hideExtraDays,
  monthIndex,
  months,
}: FillDatesParams) => {
  const cachedMonth = cachedMonths[`${calendarKey}-${monthIndex}-${firstDay}-${hideExtraDays}`];

  if (cachedMonth) {
    return cachedMonth;
  } else {
    const monthDates = fillDates({
      calendarKey,
      dates,
      firstDay,
      hideExtraDays,
      monthIndex,
      months,
    });
    cachedMonths[`${calendarKey}-${monthIndex}-${firstDay}-${hideExtraDays}`] = monthDates;
    return monthDates;
  }
};
