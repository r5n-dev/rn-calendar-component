import React, { forwardRef, useEffect, useMemo } from 'react';

import Calendar from './Calendar';
import { constants, generateDates, monthsData } from './helpers';
import Locales from './Locales';
import {
  defaultTheme,
  useCalendarConfig,
  useCalendarData,
  useCallbacksState,
  useCustomComponents,
  useMarkedDates,
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
      showExtraDays,
      showArrows,
      ...rest
    },
    ref,
  ) => {
    const setMarkDates = useMarkedDates(({ setMarkedDates }) => setMarkedDates);
    const setCalendarData = useCalendarData(({ setCalendarData }) => setCalendarData);
    const setCalendarConfig = useCalendarConfig(({ setCalendarConfig }) => setCalendarConfig);
    const setCustomComponents = useCustomComponents(
      ({ setCustomComponents }) => setCustomComponents,
    );
    const setCallbacks = useCallbacksState(({ setCallbacks }) => setCallbacks);

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

    const [months, dates] = useMemo(() => {
      const dates = generateDates({
        startISODate,
        endISODate,
      });

      return [monthsData(dates), dates];
    }, [endISODate, startISODate]);

    useEffect(() => {
      setCalendarData({ months, dates });
    }, [dates, months, setCalendarData]);

    useEffect(() => {
      setCalendarConfig({
        locale: selectedLocale,
        horizontal,
        showExtraDays,
        showArrows,
        firstDay,
        listWidth: 0,
        theme: mergeTheme(theme),
      });
    }, [firstDay, horizontal, selectedLocale, setCalendarConfig, showExtraDays, theme, showArrows]);

    useEffect(() => {
      setCustomComponents({ Arrows });
    }, [Arrows, setCustomComponents]);

    useEffect(() => {
      setCallbacks({ onArrowPress, onDayPress });
    }, [onArrowPress, onDayPress, setCallbacks]);

    return months.length > 0 ? (
      <Calendar {...rest} {...{ calendarHeight, currentDay, ref }} />
    ) : null;
  },
);

export default CalendarWrapper;
