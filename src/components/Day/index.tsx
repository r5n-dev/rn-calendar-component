import React, { useCallback } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

import { DayComponentProps } from '../../componentTypes';
import { constants } from '../../helpers';

import Dots from './Dots';

const Day = ({
  backgroundColor = 'turquoise',
  color = 'black',
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

  if (!day) {
    return (
      <View style={[styles.container, { maxWidth: listWidth / 7 }]}>
        <View style={[styles.dayContainer, { padding: listWidth / 40 }]}>
          <Text style={styles.dayText} />
        </View>
      </View>
    );
  }

  return (
    <TouchableOpacity
      accessibilityLabel={day}
      accessibilityRole="button"
      accessible
      activeOpacity={0.4}
      onPress={handleDayPress}
      style={[styles.container, { maxWidth: listWidth / 7 }]}
    >
      <View
        style={[
          styles.dayContainer,
          { padding: listWidth / 40 },
          inSeries && [styles.inSeriesRadius, { width: listWidth / 7 }],
          startingDay && styles.startingRadius,
          endingDay && styles.endingRadius,

          theme?.container,
          today && theme?.todayContainer,
          selected && (theme?.selectedContainer || { backgroundColor }),
          extraDay && theme?.extraDayContainer,
        ]}
      >
        <Text
          style={[
            styles.dayText,

            theme?.text,
            today && (theme?.todayText || styles.todayText),
            extraDay && (theme?.extraDayText || styles.extraDayText),
            selected && theme?.selectedText,

            { color },
          ]}
        >
          {day}
        </Text>

        <Dots dots={dots} selected={selected} />
      </View>
    </TouchableOpacity>
  );
};

const areEqual = (
  {
    backgroundColor,
    color,
    day,
    dayString,
    dots,
    endingDay,
    inSeries,
    month,
    selected,
    startingDay,
    year,
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
    year === nextProps.year &&
    dots === nextProps.dots
  );
};

export default React.memo<DayComponentProps>(Day, areEqual);

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
    textAlign: 'center',
    width: 20,
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
