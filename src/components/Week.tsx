import React from 'react';
import { View, StyleSheet } from 'react-native';

import { WeekComponentProps } from '../types';

const Week = ({
  DayComponent,
  onDayPress,
  markedDates,
  week,
}: WeekComponentProps) => {
  return (
    <View style={styles.container}>
      {week.map((item, index) => (
        <DayComponent
          key={item.dayString ? item.dayString : `${index}`}
          onPress={onDayPress}
          {...item}
          {...(markedDates && markedDates[item.dayString])}
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
