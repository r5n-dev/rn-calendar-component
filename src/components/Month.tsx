import React, { useMemo } from 'react';
import { View } from 'react-native';

import { fillDates, chunk, constants } from '../helpers';
import { MonthComponentProps } from '../componentTypes';

const Month = ({
  Day,
  DayNames,
  MonthTitle,
  Week,
  firstDay,
  hideExtraDays,
  horizontal,
  index,
  item: [month, dates],
  listWidth,
  locales,
  markedDates,
  months,
  onDayPress,
  theme,
}: MonthComponentProps) => {
  const monthDates = useMemo(
    () =>
      fillDates({
        hideExtraDays,
        firstDay,
        dates,
        monthIndex: index,
        months,
      }),
    [hideExtraDays, firstDay, dates, index, months]
  );

  const weeks = useMemo(() => chunk(monthDates, constants.weekLength), [
    monthDates,
  ]);

  const [year, monthString] = month.split('-');

  console.log(weeks);

  return (
    <View key={month} style={horizontal && { width: listWidth }}>
      <MonthTitle
        theme={theme?.monthTitle}
        title={`${locales.monthNames[Number(monthString) - 1]} ${year}`}
      />

      <DayNames dayNames={locales.dayNamesShort} theme={theme?.dayNames} />

      {weeks.map((week) => (
        <Week
          Day={Day}
          dayTheme={theme?.day}
          key={week.find(({ dayString }) => dayString)?.dayString}
          listWidth={listWidth}
          markedDates={markedDates}
          onDayPress={onDayPress}
          theme={theme?.week}
          week={week}
        />
      ))}
    </View>
  );
};

export default React.memo(Month);
