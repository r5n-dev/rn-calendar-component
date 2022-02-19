import React, { useCallback, useMemo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { useDay } from '../hooks/useCalendar';
import type { CalendarDate } from '../types';

import Dots from './Dots';

export type DayProps = CalendarDate & {
  pastDay: boolean;
  today: boolean;
};

const Day = ({ day, dayString, month, today, pastDay, year }: DayProps) => {
  const {
    theme,
    listWidth,
    onDayPress,
    extraDay,
    selected,
    color,
    inSeries,
    startingDay,
    endingDay,
    dots,
  } = useDay(dayString);

  const textStyle = [
    theme?.day?.text,
    today && theme?.day?.todayText,
    pastDay && theme?.day?.pastDayText,
    extraDay && theme?.day?.extraDayText,
    selected && theme?.day?.selectedText,
    color ? { color } : undefined,
  ];

  const handleDayPress = useCallback(() => {
    onDayPress?.({ day, month, year, dayString });
  }, [day, dayString, month, onDayPress, year]);

  const width = useMemo(() => listWidth / 7, [listWidth]);
  const padding = useMemo(() => Math.min(listWidth / 40, 15), [listWidth]);

  if (!day) {
    return (
      <View style={[theme?.day?.container, { width }]}>
        <View style={[{ padding, width }, theme?.day?.textContainer]}>
          <Text style={theme?.day?.text} />
        </View>
      </View>
    );
  }

  return (
    <TouchableOpacity
      accessible
      accessibilityLabel={day}
      accessibilityRole="button"
      activeOpacity={0.6}
      onPress={handleDayPress}
      style={[theme?.day?.container, { width }]}
    >
      <View
        style={[
          { padding },
          inSeries && theme?.day?.inSeriesContainer,
          startingDay && theme?.day?.startingDayContainer,
          endingDay && theme?.day?.endingDayContainer,

          theme?.day?.textContainer,

          today && theme?.day?.todayContainer,
          pastDay && theme?.day?.pastDayContainer,
          selected && theme?.day?.selectedContainer,
          extraDay && theme?.day?.extraDayContainer,
        ]}
      >
        <Text style={textStyle}>{day}</Text>

        <Dots dots={dots} selected={selected} />
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(Day);
