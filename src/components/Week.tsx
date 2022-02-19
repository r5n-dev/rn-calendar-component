import React from 'react';
import { View } from 'react-native';

import { constants } from '../helpers';
import { useTheme } from '../hooks/useCalendar';
import type { CalendarDate } from '../types';

import Day from './Day';

export type WeekProps = {
  week: Array<CalendarDate>;
};

const Week = ({ week }: WeekProps) => {
  const theme = useTheme('week');

  return (
    <View style={theme?.container}>
      {week.map((item, index) => (
        <Day
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
