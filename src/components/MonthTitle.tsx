import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import { MonthTitleComponentProps } from '../componentTypes';

const MonthTitle = ({ title, theme }: MonthTitleComponentProps) => {
  return (
    <View pointerEvents="none" style={[styles.container, theme?.container]}>
      <Text style={[styles.title, theme?.text]}>{title}</Text>
    </View>
  );
};

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
