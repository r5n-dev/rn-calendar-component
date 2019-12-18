import React, { useCallback } from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

import { DayComponentProps } from '../types';
import { constants } from '../helpers';

const Day = ({
  day,
  selected,
  month,
  year,
  dayString,
  onPress,
  color = 'black',
  backgroundColor = 'turquoise',
}: DayComponentProps) => {
  const handleDayPress = useCallback(() => {
    onPress && onPress({ day, month, year, dayString });
  }, [day, dayString, month, onPress, year]);

  if (!day) {
    return <View style={styles.container} />;
  }

  return (
    <TouchableOpacity
      activeOpacity={0.4}
      accessible
      accessibilityRole="button"
      accessibilityLabel={day}
      onPress={handleDayPress}
      style={styles.container}
    >
      <View style={[styles.dayContainer, selected && { backgroundColor }]}>
        <Text style={[styles.dayText, { color }]}>{day}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo<DayComponentProps>(Day);

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  dayText: {
    textAlign: 'center',
    fontSize: 16,
    width: 20,
  },
  dayContainer: {
    borderRadius: constants.touchableSize / 2,
    padding: 10,
  },
  container: {
    height: constants.touchableSize,
    width: width / 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
