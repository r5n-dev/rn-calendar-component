import React from 'react';
import { Text, View } from 'react-native';

import { useCalendar } from '../context/hooks';

export type MonthTitleProps = {
  title: string;
};

const MonthTitle = ({ title }: MonthTitleProps) => {
  const { theme } = useCalendar();

  return (
    <View pointerEvents="none" style={theme?.monthTitle?.container}>
      <Text style={theme?.monthTitle?.text}>{title}</Text>
    </View>
  );
};

export default React.memo(MonthTitle);
