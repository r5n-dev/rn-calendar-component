import React from 'react';
import { View } from 'react-native';

import { useCalendar } from '../context/hooks';
import { constants } from '../helpers';
import { CalendarDate } from '../types';

import Day from './Day';

export type WeekProps = {
  week: Array<CalendarDate>;
};

const Week = ({ week }: WeekProps) => {
  const { theme } = useCalendar();

  return (
    <View style={theme?.week?.container}>
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
