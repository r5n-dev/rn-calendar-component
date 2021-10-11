import React, { useMemo } from 'react';
import { View } from 'react-native';

import { MonthComponentProps } from '../componentTypes';
import { chunk, constants, fillDates } from '../helpers';

const Month = ({
  Day,
  DayNames,
  MonthTitle,
  Week,
  calendarKey,
  dates,
  firstDay,
  hideExtraDays,
  horizontal,
  index,
  listWidth,
  locales,
  markedDates,
  month,
  months,
  onDayPress,
  theme,
}: MonthComponentProps) => {
  const monthDates = useMemo(
    () =>
      fillDates({
        calendarKey,
        hideExtraDays,
        firstDay,
        dates,
        monthIndex: index,
        months,
      }),
    [hideExtraDays, calendarKey, firstDay, dates, index, months],
  );

  const weeks = useMemo(() => chunk(monthDates, constants.weekLength), [monthDates]);

  const [year, monthString] = month.split('-');

  return (
    <View key={month} style={horizontal && { width: listWidth }}>
      <MonthTitle
        theme={theme?.monthTitle}
        title={`${locales.monthNames[Number(monthString) - 1]} ${year}`}
      />

      <DayNames dayNames={locales.dayNamesShort} theme={theme?.dayNames} />

      {weeks.map((week) => {
        const key = week.find(({ dayString }) => dayString)?.dayString;
        if (!key) return null;

        return (
          <Week
            Day={Day}
            dayTheme={theme?.day}
            key={key}
            listWidth={listWidth}
            markedDates={markedDates}
            onDayPress={onDayPress}
            theme={theme?.week}
            week={week}
          />
        );
      })}
    </View>
  );
};

export default React.memo(Month);
