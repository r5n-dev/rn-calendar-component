import React, { forwardRef, useEffect, useMemo } from 'react';

import Calendar from './Calendar';
import { constants, generateDates, monthsData } from './helpers';
import Locales from './Locales';
import {
  defaultTheme,
  useCalendarConfig,
  useCallbacksState,
  useCustomComponents,
  useMarkedDates,
  useMonths,
} from './store';
import type { CalendarRef, CalendarTheme, LibraryProps, Locale } from './types';

const mergeTheme = (theme?: CalendarTheme) => {
  const newTheme = { ...defaultTheme };

  if (theme) {
    Object.entries(theme).forEach(([themeScope, themeScopeValues]) => {
      Object.keys(themeScopeValues).forEach((themeProperty) => {
        // @ts-expect-error
        newTheme[themeScope][themeProperty] = theme[themeScope][themeProperty];
      });
    });
  }

  return newTheme;
};

const CalendarWrapper = forwardRef<CalendarRef, LibraryProps>(
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
    const setMarkDates = useMarkedDates((state) => state.setMarkedDates);
    const setMonths = useMonths((state) => state.setMonths);
    const setCalendarConfig = useCalendarConfig((state) => state.setCalendarConfig);
    const setCustomComponents = useCustomComponents((state) => state.setCustomComponents);
    const setCallbacks = useCallbacksState((state) => state.setCallbacks);

    useEffect(() => {
      setMarkDates(markedDates || {});
    }, [markedDates, setMarkDates]);

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

    const months = useMemo(() => {
      const dates = generateDates({
        startISODate,
        endISODate,
      });

      return monthsData(dates);
    }, [endISODate, startISODate]);

    useEffect(() => {
      setMonths(months);
    }, [months, setMonths]);

    useEffect(() => {
      setCalendarConfig({
        locale: selectedLocale,
        horizontal,
        showExtraDays,
        firstDay,
        listWidth: 0,
        theme: mergeTheme(theme),
      });
    }, [firstDay, horizontal, selectedLocale, setCalendarConfig, showExtraDays, theme]);

    useEffect(() => {
      setCustomComponents({ Day, Arrows, DayNames, MonthTitle, Week });
    }, [Arrows, Day, DayNames, MonthTitle, Week, setCustomComponents]);

    useEffect(() => {
      setCallbacks({ onArrowPress, onDayPress });
    }, [onArrowPress, onDayPress, setCallbacks]);

    return (
      <>
        {months.length > 0 && (
          <Calendar
            {...rest}
            {...{
              calendarHeight,
              currentDay,
              viewabilityConfig,
              ref,
            }}
          />
        )}
      </>
    );
  },
);

export default CalendarWrapper;
