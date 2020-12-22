import React, { useCallback, useMemo } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

import { DayComponentProps } from '../../componentTypes';
import { constants } from '../../helpers';

import Dots from './Dots';

const Day = ({
  backgroundColor = 'turquoise',
  color,
  day,
  dayString,
  dots,
  endingDay,
  extraDay,
  inSeries,
  listWidth,
  month,
  onPress,
  selected,
  startingDay,
  theme,
  today,
  year,
}: DayComponentProps) => {
  const handleDayPress = useCallback(() => {
    onPress?.({ day, month, year, dayString });
  }, [day, dayString, month, onPress, year]);

  const width = useMemo(() => listWidth / 7, [listWidth]);
  const padding = useMemo(() => Math.min(listWidth / 40, 15), [listWidth]);

  if (!day) {
    return (
      <View style={[styles.container, { width }]}>
        <View
          style={[styles.dayContainer, { padding, width }, theme?.container]}
        >
          <Text style={StyleSheet.flatten([styles.dayText, theme?.text])} />
        </View>
      </View>
    );
  }

  return (
    <TouchableOpacity
      accessibilityLabel={day}
      accessibilityRole="button"
      accessible
      activeOpacity={0.6}
      onPress={handleDayPress}
      style={[styles.container, { width }]}
    >
      <View
        style={[
          styles.dayContainer,
          { padding, width },
          inSeries && styles.inSeriesRadius,
          startingDay && styles.startingRadius,
          endingDay && styles.endingRadius,

          theme?.container,
          today && theme?.todayContainer,
          selected && (theme?.selectedContainer || { backgroundColor }),
          extraDay && theme?.extraDayContainer,
        ]}
      >
        <Text
          style={StyleSheet.flatten([
            styles.dayText,
            theme?.text,

            today && (theme?.todayText || styles.todayText),
            extraDay && (theme?.extraDayText || styles.extraDayText),
            selected && theme?.selectedText,
            color ? { color } : null,
          ])}
        >
          {day}
        </Text>

        <Dots dots={dots} selected={selected} />
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(Day);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    height: constants.touchableSize,
    justifyContent: 'center',
  },
  dayContainer: {
    borderBottomLeftRadius: constants.touchableSize / 2,
    borderBottomRightRadius: constants.touchableSize / 2,
    borderTopLeftRadius: constants.touchableSize / 2,
    borderTopRightRadius: constants.touchableSize / 2,
    marginHorizontal: 5,
  },
  dayText: {
    fontSize: 16,
    minWidth: 20,
    textAlign: 'center',
  },
  endingRadius: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: constants.touchableSize / 2,
    borderTopLeftRadius: 0,
    borderTopRightRadius: constants.touchableSize / 2,
  },
  extraDayText: {
    color: 'lightgrey',
  },
  inSeriesRadius: {
    alignItems: 'center',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    justifyContent: 'center',
    marginHorizontal: 0,
  },
  startingRadius: {
    borderBottomLeftRadius: constants.touchableSize / 2,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: constants.touchableSize / 2,
    borderTopRightRadius: 0,
  },
  todayText: {
    color: 'dodgerblue',
    fontWeight: '700',
  },
});
