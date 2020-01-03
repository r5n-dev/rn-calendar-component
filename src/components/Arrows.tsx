import React from 'react';
import { TouchableOpacity, StyleSheet, Image, View } from 'react-native';

import arrow from '../assets/arrow.png';
import { constants } from '../helpers';
import { ArrowsComponentProps } from '../componentTypes';

const Arrows = ({ onArrowPress }: ArrowsComponentProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => onArrowPress('left')}
        style={styles.leftArrow}
      >
        <Image source={arrow} style={styles.arrowIcon} />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => onArrowPress('right')}
        style={styles.rightArrow}
      >
        <Image source={arrow} style={styles.arrowIcon} />
      </TouchableOpacity>
    </View>
  );
};

export default Arrows;

const styles = StyleSheet.create({
  arrowIcon: {
    height: constants.touchableSize * 0.8,
    width: constants.touchableSize * 0.8,
  },
  container: {
    flexDirection: 'row',
    zIndex: 1,
  },
  leftArrow: {
    left: constants.touchableSize * 0.8,
    position: 'absolute',
  },
  rightArrow: {
    position: 'absolute',
    right: constants.touchableSize * 0.8,
    transform: [
      {
        rotate: '180deg',
      },
    ],
  },
});
