import React, { useMemo } from 'react';
import { View } from 'react-native';

import { chunk, constants } from '../helpers';
import { useMonth } from '../hooks';
import { useCustomComponents } from '../store';

import DayNames from './DayNames';
import MonthTitle from './MonthTitle';
import Week from './Week';

export type MonthProps = {
  index: number;
  month: string;
};

const Month = ({ index, month }: MonthProps) => {
  const { monthDates, horizontal, locale, listWidth } = useMonth(index);
  const { CustomWeek, CustomDayNames, CustomMonthTitle } = useCustomComponents(
    ({ Week, DayNames, MonthTitle }) => ({
      CustomDayNames: DayNames,
      CustomMonthTitle: MonthTitle,
      CustomWeek: Week,
    }),
  );
  const WeekComponent = CustomWeek || Week;
  const DayNamesComponent = CustomDayNames || DayNames;
  const MonthTitleComponent = CustomMonthTitle || MonthTitle;

  const weeks = useMemo(() => chunk(monthDates, constants.weekLength), [monthDates]);
  const [year, monthString] = month.split('-');

  return (
    <View key={month} style={horizontal && { width: listWidth }}>
      <MonthTitleComponent title={`${locale.monthNames[Number(monthString) - 1]} ${year}`} />

      <DayNamesComponent dayNames={locale.dayNamesShort} />

      {weeks.map((week) => {
        const key = week.find(({ dayString }) => dayString)?.dayString;
        if (!key) return null;

        return <WeekComponent key={key} week={week} />;
      })}
    </View>
  );
};

export default React.memo(Month);
