import React, { useCallback } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

import { constants } from '../helpers';
import { useArrow } from '../hooks/useCalendar';
import { useMonths } from '../store';

// @ts-expect-error
import arrow from './assets/arrow.png';

export type ArrowsProps = {
  leftArrowDisabled: boolean;
  rightArrowDisabled: boolean;
  currentMonthIndex: number;
  scrollToIndex: (index: number) => void;
  setCurrentMonthIndex: (index: number) => void;
};

const Arrows = ({
  currentMonthIndex,
  setCurrentMonthIndex,
  leftArrowDisabled,
  rightArrowDisabled,
  scrollToIndex,
}: ArrowsProps) => {
  const { onArrowPress, listWidth } = useArrow();
  const monthsLength = useMonths((state) => state.months.length);
  const handleArrowPress = useCallback(
    (direction: 'left' | 'right') => {
      onArrowPress?.({
        direction,
        currentMonthIndex,
        lastMonthIndex: monthsLength - 1,
      });

      if (direction === 'left') {
        const nextMonthIndex = currentMonthIndex - 1;

        if (nextMonthIndex >= 0) {
          setCurrentMonthIndex(nextMonthIndex);
          scrollToIndex(nextMonthIndex);
        }
      } else if (direction === 'right') {
        const nextMonthIndex = currentMonthIndex + 1;

        if (nextMonthIndex < monthsLength) {
          setCurrentMonthIndex(nextMonthIndex);
          scrollToIndex(nextMonthIndex);
        }
      }
    },
    [onArrowPress, currentMonthIndex, monthsLength, setCurrentMonthIndex, scrollToIndex],
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        disabled={leftArrowDisabled}
        onPress={() => handleArrowPress('left')}
        style={[styles.leftArrow, leftArrowDisabled && styles.disabledArrow]}
      >
        <Image source={arrow} style={styles.arrowIcon} />
      </TouchableOpacity>

      <TouchableOpacity
        disabled={rightArrowDisabled}
        onPress={() => handleArrowPress('right')}
        style={[
          styles.rightArrow,
          { left: listWidth - constants.touchableSize * 1.6 },
          rightArrowDisabled && styles.disabledArrow,
        ]}
      >
        <Image source={arrow} style={styles.arrowIcon} />
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(Arrows);

const styles = StyleSheet.create({
  arrowIcon: {
    height: constants.touchableSize * 0.8,
    width: constants.touchableSize * 0.8,
  },
  container: {
    flexDirection: 'row',
    position: 'absolute',
  },
  disabledArrow: {
    opacity: 0.5,
  },
  leftArrow: {
    left: constants.touchableSize * 0.8,
    position: 'absolute',
    zIndex: 1,
  },
  rightArrow: {
    position: 'absolute',
    transform: [
      {
        rotate: '180deg',
      },
    ],
    zIndex: 1,
  },
});
