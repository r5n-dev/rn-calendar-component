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
    dayTheme,
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
    dayTheme?.text,
    today && dayTheme?.todayText,
    pastDay && dayTheme?.pastDayText,
    extraDay && dayTheme?.extraDayText,
    selected && dayTheme?.selectedText,
    color ? { color } : undefined,
  ];

  const handleDayPress = useCallback(() => {
    onDayPress?.({ day, month, year, dayString });
  }, [day, dayString, month, onDayPress, year]);

  const width = useMemo(() => listWidth / 7, [listWidth]);
  const padding = useMemo(() => Math.min(listWidth / 40, 15), [listWidth]);

  if (!day) {
    return (
      <View style={[dayTheme?.container, { width }]}>
        <View style={[{ padding, width }, dayTheme?.textContainer]}>
          <Text style={dayTheme?.text} />
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
      style={[dayTheme?.container, { width }]}
    >
      <View
        style={[
          { padding },
          inSeries && dayTheme?.inSeriesContainer,
          startingDay && dayTheme?.startingDayContainer,
          endingDay && dayTheme?.endingDayContainer,

          dayTheme?.textContainer,

          today && dayTheme?.todayContainer,
          pastDay && dayTheme?.pastDayContainer,
          selected && dayTheme?.selectedContainer,
          extraDay && dayTheme?.extraDayContainer,
        ]}
      >
        <Text style={textStyle}>{day}</Text>

        <Dots dots={dots} selected={selected} />
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(Day);
