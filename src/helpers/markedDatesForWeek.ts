import { CalendarDate, MarkedDates } from '../types';

const withSeriesInfo = ({
  week,
  markedDates,
}: {
  week: Array<CalendarDate>;
  markedDates: MarkedDates;
}): MarkedDates | null => {
  const markedDays = Object.keys(markedDates);
  if (!markedDays.length) {
    return null;
  }

  const indexes = markedDays
    .map(a => week.findIndex(({ dayString }: CalendarDate) => a === dayString))
    .filter(i => i >= 0);
  if (!indexes.length) {
    return null;
  }

  const series = [];
  let tmpSerie = [];

  for (let index = 0; index < indexes.length; index++) {
    const previous = indexes[index - 1];
    const current = indexes[index];
    const next = indexes[index + 1];

    if (previous === undefined && next - current === 1) {
      tmpSerie.push(current);
    } else if (next === undefined && current - previous === 1) {
      tmpSerie.push(current);
    } else if (next - current === 1) {
      tmpSerie.push(current);
    } else if (current - previous === 1) {
      tmpSerie.push(current);
      series.push(tmpSerie);
      tmpSerie = [];
    }
  }

  if (tmpSerie.length) {
    series.push(tmpSerie);
  }

  // @ts-ignore
  return series.reduce((acc, selectedSerie) => {
    const days = selectedSerie.map((dayIndex: number) => week[dayIndex]);
    const reducedDays = days.reduce(
      (acc: MarkedDates, { dayString }, index, serie) => {
        const markedDateInfo = markedDates[dayString];
        if (serie.length === 1) {
          acc[dayString] = markedDateInfo;
        } else {
          acc[dayString] = {
            ...markedDateInfo,
            ...(index === 0 && { startingDay: true }),
            ...(index === days.length - 1 && { endingDay: true }),
            inSeries: true,
          };
        }

        return acc;
      },
      {}
    );

    acc = { ...acc, ...reducedDays };
    return acc;
  }, {});
};

const markedDatesForWeek = (
  week: Array<CalendarDate>,
  markedDates?: MarkedDates
): MarkedDates => {
  if (!markedDates) {
    return {};
  }

  const markedDatesWithSeriesInfo = withSeriesInfo({ week, markedDates });

  if (
    markedDatesWithSeriesInfo &&
    Object.keys(markedDatesWithSeriesInfo).length
  ) {
    return { ...markedDates, ...markedDatesWithSeriesInfo };
  }

  return markedDates;
};

export default markedDatesForWeek;
