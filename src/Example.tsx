import React from 'react';
import { View, Text } from 'react-native';

import { generateDates } from './helpers';

export const Example = () => {
  const dates = generateDates({
    startISODate: '2013-12-31',
    endISODate: '2019-12-31',
  });

  return dates.map(({ dayString }) => (
    <View key={dayString}>
      <Text>{dayString}</Text>
    </View>
  ));
};
