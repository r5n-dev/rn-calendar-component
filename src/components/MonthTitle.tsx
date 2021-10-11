import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { MonthTitleComponentProps } from '../componentTypes';

const MonthTitle = ({ title, theme }: MonthTitleComponentProps) => {
  return (
    <View pointerEvents="none" style={[styles.container, theme?.container]}>
      <Text style={[styles.title, theme?.text]}>{title}</Text>
    </View>
  );
};

export default React.memo(MonthTitle);

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  title: {
    alignSelf: 'center',
    fontSize: 16,
  },
});
