import React, { useCallback, useMemo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { useCalendar } from '../context/hooks';
import { useMarkedDate } from '../hooks/useMarkedDate';
import { CalendarDate } from '../types';

import Dots from './Dots';

export type DayProps = CalendarDate & {
  pastDay: boolean;
  today: boolean;
};

const Day = ({ day, dayString, month, today, pastDay, year }: DayProps) => {
  const { theme: dayTheme, listWidth, onDayPress } = useCalendar();
  const { extraDay, selected, color, inSeries, startingDay, endingDay, dots } =
    useMarkedDate(dayString);
  const theme = dayTheme?.day;

  const textStyle = [
    theme?.text,
    today && theme?.todayText,
    pastDay && theme?.pastDayText,
    extraDay && theme?.extraDayText,
    selected && theme?.selectedText,
    color ? { color } : undefined,
  ];

  const handleDayPress = useCallback(() => {
    onDayPress?.({ day, month, year, dayString });
  }, [day, dayString, month, onDayPress, year]);

  const width = useMemo(() => listWidth / 7, [listWidth]);
  const padding = useMemo(() => Math.min(listWidth / 40, 15), [listWidth]);

  if (!day) {
    return (
      <View style={[theme?.container, { width }]}>
        <View style={[{ padding, width }, theme?.textContainer]}>
          <Text style={theme?.text} />
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
      style={[theme?.container, { width }]}
    >
      <View
        style={[
          { padding },
          inSeries && theme?.inSeriesContainer,
          startingDay && theme?.startingDayContainer,
          endingDay && theme?.endingDayContainer,

          theme?.textContainer,

          today && theme?.todayContainer,
          pastDay && theme?.pastDayContainer,
          selected && theme?.selectedContainer,
          extraDay && theme?.extraDayContainer,
        ]}
      >
        <Text style={textStyle}>{day}</Text>

        <Dots dots={dots} selected={selected} />
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(Day);
