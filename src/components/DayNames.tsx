import React from 'react';
import { Text, View } from 'react-native';

import { useCalendar } from '../context/hooks';

export type DayNamesProps = {
  dayNames: Array<string>;
};

const DayNames = ({ dayNames }: DayNamesProps) => {
  const { theme } = useCalendar();
  return (
    <View style={theme?.dayNames?.container}>
      {dayNames.map((dayName) => (
        <View key={dayName} style={theme?.dayNames?.textContainer}>
          <Text style={theme?.dayNames?.text}>{dayName}</Text>
        </View>
      ))}
    </View>
  );
};

export default React.memo(DayNames);
