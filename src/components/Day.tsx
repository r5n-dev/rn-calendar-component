import React, { useCallback, useMemo } from 'react';
import { Pressable, Text, View } from 'react-native';

import { useDay } from '../hooks';
import type { CalendarDate } from '../types';

import Dots from './Dots';

export type DayProps = CalendarDate & {
  pastDay: boolean;
  today: boolean;
};

const Day = ({ day, dayString, dayIndex, month, today, pastDay, year }: DayProps) => {
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
  } = useDay(dayString, dayIndex);

  const textStyle = useMemo(
    () => [
      dayTheme?.text,
      today && dayTheme?.todayText,
      pastDay && dayTheme?.pastDayText,
      extraDay && dayTheme?.extraDayText,
      selected && dayTheme?.selectedText,
      color ? { color } : undefined,
    ],
    [color, dayTheme, extraDay, pastDay, selected, today],
  );

  const handleDayPress = useCallback(() => {
    onDayPress?.({ day, month, year, dayString });
  }, [day, dayString, month, onDayPress, year]);

  const width = useMemo(() => listWidth / 7, [listWidth]);
  const padding = useMemo(() => Math.min(listWidth / 40, 15), [listWidth]);
  const hasDots = useMemo(() => dots && Object.keys(dots).length > 0, [dots]);

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
    <Pressable
      accessible
      accessibilityLabel={day}
      accessibilityRole="button"
      onPress={handleDayPress}
      style={({ pressed }) => [dayTheme?.container, { width, opacity: pressed ? 0.6 : 1 }]}
    >
      <View
        style={[
          { padding },
          dayTheme?.textContainer,

          inSeries && dayTheme?.inSeriesContainer,
          startingDay && dayTheme?.startingDayContainer,
          endingDay && dayTheme?.endingDayContainer,

          today && dayTheme?.todayContainer,
          pastDay && dayTheme?.pastDayContainer,
          selected && dayTheme?.selectedContainer,
          extraDay && dayTheme?.extraDayContainer,
        ]}
      >
        <Text style={textStyle}>{day}</Text>

        {hasDots && <Dots dots={dots} selected={selected} />}
      </View>
    </Pressable>
  );
};

export default React.memo(Day);
