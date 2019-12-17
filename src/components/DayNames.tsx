import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
  dayNames: Array<string>;
};

const DayNames = ({ dayNames }: Props) => (
  <View style={styles.container}>
    {dayNames.map(dayName => (
      <View style={styles.dayNameContainer} key={dayName}>
        <Text>{dayName}</Text>
      </View>
    ))}
  </View>
);

export default React.memo<Props>(DayNames);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  dayNameContainer: {
    alignItems: 'center',
    flex: 1,
  },
});
