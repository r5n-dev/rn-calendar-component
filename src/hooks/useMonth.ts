import { useMemo } from 'react';

import { fillDates } from '../helpers/fillDates';
import { useCalendarConfig, useCalendarData } from '../store';

const useMonth = (monthIndex: number) => {
  const { showExtraDays, firstDay, horizontal, locale, listWidth } = useCalendarConfig();
  const months = useCalendarData(({ months }) => months);
  const dates = useMemo(() => months[monthIndex]?.[1] || [], [months, monthIndex]);

  const monthDates = useMemo(
    () =>
      fillDates({
        dates,
        showExtraDays,
        firstDay,
        monthIndex,
        months,
      }),
    [dates, firstDay, monthIndex, months, showExtraDays],
  );

  return { monthDates, horizontal, locale, listWidth };
};

export default useMonth;
