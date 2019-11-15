import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

type Props = {
  dayNames: Array<string>;
};

const DayNames = ({ dayNames }: Props) => {
  return (
    <View style={styles.container}>
      {dayNames.map(dayName => (
        <View style={styles.dayNameContainer} key={dayName}>
          <Text>{dayName}</Text>
        </View>
      ))}
    </View>
  );
};

export default DayNames;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20,
  },
  dayNameContainer: {
    alignItems: 'center',
    flex: 1,
  },
});
