import React, { forwardRef, useMemo } from 'react';

import Calendar from './Calendar';
import { CalendarProvider } from './context/Provider';
import { constants, generateDates, monthsData } from './helpers';
import Locales from './Locales';
import { CalendarRef, LibraryProps, Locale } from './types';

const CalendarContext = forwardRef<CalendarRef, LibraryProps>(
  (
    {
      Arrows,
      Day,
      DayNames,
      MonthTitle,
      Week,

      calendarHeight = 360,
      currentDay = constants.todayDate,
      endISODate,
      firstDay = 0,
      horizontal,
      locale = 'en',
      markedDates,
      onArrowPress,
      onDayPress,
      startISODate,
      theme,
      viewabilityConfig = { itemVisiblePercentThreshold: 1 },
      showExtraDays,
      ...rest
    },
    ref,
  ) => {
    const selectedLocale: Locale = useMemo(() => {
      let selectedLocale = { ...(Locales[locale] || Locales.defaultLocale) };

      if (firstDay) {
        const [dayName, ...restDayNames] = selectedLocale.dayNames;
        const [dayNameShort, ...restDayNamesShort] = selectedLocale.dayNamesShort;

        selectedLocale = {
          ...selectedLocale,
          dayNames: [...restDayNames, dayName],
          dayNamesShort: [...restDayNamesShort, dayNameShort],
        };
      }

      return selectedLocale;
    }, [firstDay, locale]);

    const [months, dates] = useMemo(() => {
      const dates = generateDates({
        startISODate,
        endISODate,
      });

      return [monthsData(dates), dates];
    }, [endISODate, startISODate]);

    return (
      <CalendarProvider
        {...{
          Arrows,
          Day,
          DayNames,
          MonthTitle,
          Week,
          dates,
          firstDay,
          horizontal,
          locale: selectedLocale,
          markedDates,
          months,
          onArrowPress,
          onDayPress,
          showExtraDays,
          theme,
        }}
      >
        <Calendar {...rest} {...{ calendarHeight, currentDay, viewabilityConfig, ref }} />
      </CalendarProvider>
    );
  },
);

export default CalendarContext;
