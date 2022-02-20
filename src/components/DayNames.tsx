import React from 'react';
import { Text, View } from 'react-native';

import { useTheme } from '../hooks/useCalendar';

export type DayNamesProps = {
  dayNames: string[];
};

const DayNames = ({ dayNames }: DayNamesProps) => {
  const theme = useTheme('dayNames');

  return (
    <View style={theme?.container}>
      {dayNames.map((dayName) => (
        <View key={dayName} style={theme?.textContainer}>
          <Text style={theme?.text}>{dayName}</Text>
        </View>
      ))}
    </View>
  );
};

export default React.memo(DayNames);
