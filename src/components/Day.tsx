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
  inSeries,
  startingDay,
  endingDay,
}: DayComponentProps) => {
  const handleDayPress = useCallback(() => {
    onPress && onPress({ day, month, year, dayString });
  }, [day, dayString, month, onPress, year]);

  if (!day) {
    return <View style={styles.container} />;
  }

  return (
    <TouchableOpacity
      accessibilityLabel={day}
      accessibilityRole="button"
      accessible
      activeOpacity={0.4}
      onPress={handleDayPress}
      style={[styles.container]}
    >
      <View
        style={[
          styles.dayContainer,
          selected && { backgroundColor },
          inSeries && styles.inSeriesRadius,
          startingDay && styles.startingRadius,
          endingDay && styles.endingRadius,
        ]}
      >
        <Text style={[styles.dayText, { color }]}>{day}</Text>
      </View>
    </TouchableOpacity>
  );
};

const areEqual = (
  {
    selected,
    day,
    month,
    year,
    dayString,
    color,
    backgroundColor,
    inSeries,
    startingDay,
    endingDay,
  }: DayComponentProps,
  nextProps: DayComponentProps
): boolean => {
  return (
    selected === nextProps.selected &&
    inSeries === nextProps.inSeries &&
    startingDay === nextProps.startingDay &&
    endingDay === nextProps.endingDay &&
    backgroundColor === nextProps.backgroundColor &&
    color === nextProps.color &&
    day === nextProps.day &&
    dayString === nextProps.dayString &&
    month === nextProps.month &&
    year === nextProps.year
  );
};

export default React.memo<DayComponentProps>(Day, areEqual);

const { width } = Dimensions.get('window');

const backgroundSpacing = width / 25;

const styles = StyleSheet.create({
  dayText: {
    textAlign: 'center',
    fontSize: 16,
    width: 20,
  },
  startingRadius: {
    borderBottomLeftRadius: constants.touchableSize / 2,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: constants.touchableSize / 2,
    borderTopRightRadius: 0,
  },
  endingRadius: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: constants.touchableSize / 2,
    borderTopLeftRadius: 0,
    borderTopRightRadius: constants.touchableSize / 2,
  },
  inSeriesRadius: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    padding: 0,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 0,
  },
  dayContainer: {
    borderBottomLeftRadius: constants.touchableSize / 2,
    borderBottomRightRadius: constants.touchableSize / 2,
    borderTopLeftRadius: constants.touchableSize / 2,
    borderTopRightRadius: constants.touchableSize / 2,
    padding: (backgroundSpacing * 2) / 3,
    marginHorizontal: 5,
  },
  container: {
    height: constants.touchableSize,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
