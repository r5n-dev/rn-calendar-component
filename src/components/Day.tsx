import React from 'react';
import { Dimensions, TouchableOpacity, StyleSheet, Text } from 'react-native';

import { CalendarDate } from '../types';

type Props = CalendarDate & {
  onPress: (date: Omit<CalendarDate, 'dayOfWeek'>) => void;
};

const Day = ({ day, month, year, dayString, onPress }: Props) => {
  return (
    <TouchableOpacity
      onPress={() => onPress({ day, month, year, dayString })}
      style={styles.container}
    >
      <Text style={styles.dayText}>{day}</Text>
    </TouchableOpacity>
  );
};

export default React.memo<Props>(Day);

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  dayText: {
    fontSize: 16,
  },
  container: {
    height: 48,
    width: width / 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
