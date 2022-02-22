import React from 'react';
import { View } from 'react-native';

import { constants } from '../helpers';
import { useTheme } from '../hooks/useCalendar';
import { useCustomComponents } from '../store';
import type { CalendarDate } from '../types';

import Day from './Day';

export type WeekProps = {
  week: CalendarDate[];
};

const Week = ({ week }: WeekProps) => {
  const theme = useTheme('week');
  const CustomDay = useCustomComponents((state) => state.Day);

  const DayComponent = CustomDay || Day;

  return (
    <View style={theme?.container}>
      {week.map((item, index) => (
        <DayComponent
          key={item.dayString ? item.dayString : `${index}`}
          pastDay={new Date(item.dayString).getTime() < new Date().getTime()}
          today={constants.todayDate === item.dayString}
          {...item}
        />
      ))}
    </View>
  );
};

export default React.memo(Week);
