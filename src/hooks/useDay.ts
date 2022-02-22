import { useCallback, useMemo } from 'react';

import { useCalendarConfig, useCallbacksState, useMarkedDates } from '../store';
import type { MarkedDate } from '../types';

const useDay = (day: string) => {
  const markedDate = useMarkedDates(useCallback((state) => state.markedDates[day], [day]));
  const { dayTheme, listWidth } = useCalendarConfig(
    useCallback(({ theme, listWidth }) => ({ listWidth, dayTheme: theme?.day }), []),
  );
  const onDayPress = useCallbacksState((state) => state.onDayPress);
  const { extraDay, selected, color, inSeries, startingDay, endingDay, dots } =
    markedDate || ({} as MarkedDate);

  return useMemo(
    () => ({
      dayTheme,
      listWidth,
      onDayPress,
      extraDay,
      selected,
      color,
      inSeries,
      startingDay,
      endingDay,
      dots,
    }),
    [
      dayTheme,
      listWidth,
      onDayPress,
      extraDay,
      selected,
      color,
      inSeries,
      startingDay,
      endingDay,
      dots,
    ],
  );
};

export default useDay;
