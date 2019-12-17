import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

type Props = {
  title: string;
};

const MonthTitle = ({ title }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default MonthTitle;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  title: {
    alignSelf: 'center',
    fontSize: 16,
  },
});
