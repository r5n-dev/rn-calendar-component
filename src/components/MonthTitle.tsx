import React from 'react';
import { Text, View } from 'react-native';

import { useTheme } from '../hooks/useCalendar';

export type MonthTitleProps = {
  title: string;
};

const MonthTitle = ({ title }: MonthTitleProps) => {
  const theme = useTheme('monthTitle');

  return (
    <View pointerEvents="none" style={theme?.container}>
      <Text style={theme?.text}>{title}</Text>
    </View>
  );
};

export default React.memo(MonthTitle);
