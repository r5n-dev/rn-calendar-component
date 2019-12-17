import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import { MonthTitleComponentProps } from '../types';

const MonthTitle = ({ title }: MonthTitleComponentProps) => (
  <View style={styles.container}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

export default React.memo<MonthTitleComponentProps>(MonthTitle);

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  title: {
    alignSelf: 'center',
    fontSize: 16,
  },
});
