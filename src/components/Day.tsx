import React, { useCallback } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity } from 'react-native';

import { DayComponentProps } from '../types';
import { constants } from '../helpers';

const Day = ({
  day,
  today,
  month,
  year,
  dayString,
  onPress,
}: DayComponentProps) => {
  const handleDayPress = useCallback(() => {
    onPress && onPress({ day, month, year, dayString });
  }, [day, dayString, month, onPress, year]);

  return (
    <TouchableOpacity
      activeOpacity={0.4}
      accessible
      accessibilityRole="button"
      accessibilityLabel={day}
      onPress={handleDayPress}
      style={[styles.container, today && styles.today]}
    >
      <Text style={styles.dayText}>{day}</Text>
    </TouchableOpacity>
  );
};

export default React.memo<DayComponentProps>(Day);

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  dayText: {
    fontSize: 16,
  },
  today: {
    backgroundColor: 'turquoise',
    borderRadius: constants.touchableSize,
  },
  container: {
    height: constants.touchableSize,
    width: constants.touchableSize,
    marginHorizontal: (width / 7 - constants.touchableSize) / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
