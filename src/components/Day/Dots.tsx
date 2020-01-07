import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Dots as DotsType } from '../../types';
import { constants } from '../../helpers';

type Props = {
  dots?: DotsType;
  selected?: boolean;
};

const Dots = ({ dots, selected }: Props) => {
  return (
    <View style={styles.container}>
      {dots &&
        Object.keys(dots).map(key => {
          const { color, selectedColor } = dots[key];
          const backgroundColor = (selected && selectedColor) || color;

          return <View key={key} style={[styles.dot, { backgroundColor }]} />;
        })}
    </View>
  );
};

export default React.memo<Props>(Dots);

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    bottom: 2,
    flexDirection: 'row',
    position: 'absolute',
  },
  dot: {
    borderRadius: constants.dotSize / 2,
    height: constants.dotSize,
    margin: 1,
    width: constants.dotSize,
  },
});
