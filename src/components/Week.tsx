import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { WeekComponentProps } from '../componentTypes';
import { constants, markedDatesForWeek } from '../helpers';

const Week = ({
  Day,
  dayTheme,
  listWidth,
  markedDates,
  onDayPress,
  theme,
  week,
}: WeekComponentProps) => {
  const weekMarkedDates = useMemo(() => markedDatesForWeek(week, markedDates), [week, markedDates]);

  return (
    <View style={[styles.container, theme?.container]}>
      {week.map((item, index) => (
        <Day
          key={item.dayString ? item.dayString : `${index}`}
          listWidth={listWidth}
          onPress={onDayPress}
          pastDay={new Date(item.dayString).getTime() < new Date().getTime()}
          theme={dayTheme}
          today={constants.todayDate === item.dayString}
          {...item}
          {...weekMarkedDates?.[item.dayString]}
        />
      ))}
    </View>
  );
};

export default React.memo(Week);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});
