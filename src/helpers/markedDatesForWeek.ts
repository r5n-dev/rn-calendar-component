import type { CalendarDate, MarkedDate } from '../types';

const withSeriesInfo = ({
  week,
  markedDates,
}: {
  week: CalendarDate[];
  markedDates: Record<string, MarkedDate>;
}): Record<string, MarkedDate> | null => {
  const markedDays = Object.keys(markedDates);
  if (!markedDays.length) {
    return null;
  }

  const indexes = markedDays
    .map((a) => week?.findIndex?.(({ dayString }: CalendarDate) => a === dayString))
    .filter((i) => i >= 0)
    .sort();

  if (!indexes.length) {
    return null;
  }

  const series = [];
  let tmpSerie = [];

  for (let index = 0; index < indexes.length; index++) {
    const previous = indexes[index - 1];
    const current = indexes[index];
    const next = indexes[index + 1];

    if (
      (previous === undefined && next - current === 1) ||
      (next === undefined && current - previous === 1) ||
      next - current === 1
    ) {
      tmpSerie.push(current);
    } else if (current - previous === 1) {
      tmpSerie.push(current);
      series.push(tmpSerie);
      tmpSerie = [];
    } else {
      series.push([current]);
    }
  }

  if (tmpSerie.length) {
    series.push(tmpSerie);
  }

  // @ts-ignore
  return series.reduce((acc, selectedSerie) => {
    const days = selectedSerie.map((dayIndex: number) => week[dayIndex]);
    const reducedDays = days.reduce(
      (acc: Record<string, MarkedDate>, { dayString }, index, serie) => {
        const markedDateInfo = markedDates[dayString];
        if (serie.length === 1) {
          acc[dayString] = markedDateInfo;
        } else {
          acc[dayString] = {
            inSeries: true,
            ...(index === 0 && { startingDay: true }),
            ...(index === days.length - 1 && { endingDay: true }),
            ...markedDateInfo,
          };
        }

        return acc;
      },
      {},
    );

    acc = { ...acc, ...reducedDays };
    return acc;
  }, {});
};

const markedDatesForWeek = (
  week: CalendarDate[],
  markedDates?: Record<string, MarkedDate>,
): Record<string, MarkedDate> | null => {
  if (!markedDates) {
    return null;
  }

  const markedDatesWithSeriesInfo = withSeriesInfo({ week, markedDates });

  if (markedDatesWithSeriesInfo && Object.keys(markedDatesWithSeriesInfo).length) {
    return markedDatesWithSeriesInfo;
  }

  return null;
};

export default markedDatesForWeek;
