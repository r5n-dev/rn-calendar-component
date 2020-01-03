import React from 'react';
import { View, StyleSheet } from 'react-native';

import { constants } from '../helpers';
import { WeekComponentProps } from '../componentTypes';

const Week = ({
  DayComponent,
  dayTheme,
  listWidth,
  markedDates,
  onDayPress,
  theme,
  week,
}: WeekComponentProps) => {
  return (
    <View style={[styles.container, theme?.container]}>
      {week.map((item, index) => (
        <DayComponent
          key={item.dayString ? item.dayString : `${index}`}
          listWidth={listWidth}
          onPress={onDayPress}
          theme={dayTheme}
          today={constants.todayDate === item.dayString}
          {...item}
          {...markedDates?.[item.dayString]}
        />
      ))}
    </View>
  );
};

export default React.memo<WeekComponentProps>(Week);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});
