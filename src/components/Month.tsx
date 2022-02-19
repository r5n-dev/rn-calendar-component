import React, { useMemo } from 'react';
import { View } from 'react-native';

import { useCalendar } from '../context/hooks';
import { chunk, constants } from '../helpers';
import { useFillDates } from '../helpers/fillDates';

import DayNames from './DayNames';
import MonthTitle from './MonthTitle';
import Week from './Week';

export type MonthProps = {
  index: number;
  month: string;
};

const Month = ({ index, month }: MonthProps) => {
  const { horizontal, locale, listWidth } = useCalendar();
  const monthDates = useFillDates(index);

  const weeks = useMemo(() => chunk(monthDates, constants.weekLength), [monthDates]);

  const [year, monthString] = month.split('-');

  return (
    <View key={month} style={horizontal && { width: listWidth }}>
      <MonthTitle title={`${locale.monthNames[Number(monthString) - 1]} ${year}`} />

      <DayNames dayNames={locale.dayNamesShort} />

      {weeks.map((week) => {
        const key = week.find(({ dayString }) => dayString)?.dayString;
        if (!key) return null;

        return <Week key={key} week={week} />;
      })}
    </View>
  );
};

export default React.memo(Month);
