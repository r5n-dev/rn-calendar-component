import React, { createContext, memo, ReactNode, useEffect, useReducer } from 'react';

import type { CalendarDate, CalendarTheme, LibraryProps, Locale } from '../types';

import { calendarReducer } from './reducer';
import { CalendarActions, CalendarState, initialState } from './types';

export const CalendarContext = createContext<CalendarState | undefined>(undefined);
export const CalendarUpdaterContext = createContext<React.Dispatch<CalendarActions>>(() => {});

type Props = Pick<
  LibraryProps,
  | 'Arrows'
  | 'Day'
  | 'DayNames'
  | 'MonthTitle'
  | 'Week'
  | 'horizontal'
  | 'onArrowPress'
  | 'firstDay'
  | 'onDayPress'
  | 'theme'
  | 'showExtraDays'
> & {
  children: ReactNode;
  locale: Locale;
  months: [string, CalendarDate[]][];
  dates: CalendarDate[];
};

const mergeTheme = (theme?: CalendarTheme) => {
  const newTheme = { ...initialState.theme };

  if (theme) {
    Object.keys(theme).forEach((themeScope) => {
      Object.keys(themeScope).forEach((themeProperty) => {
        // @ts-expect-error
        newTheme[themeScope][themeProperty] = theme[themeScope][themeProperty];
      });
    });
  }

  return newTheme;
};

export const CalendarProvider = memo(
  ({
    Arrows,
    Day,
    DayNames,
    firstDay,
    MonthTitle,
    Week,
    children,
    horizontal,
    locale,
    dates,
    months,
    onArrowPress,
    onDayPress,
    showExtraDays,
    theme,
  }: Props) => {
    const [state, dispatch] = useReducer(calendarReducer, {
      Arrows,
      Day,
      DayNames,
      MonthTitle,
      Week,
      dates,
      firstDay: firstDay || initialState.firstDay,
      horizontal,
      listWidth: initialState.listWidth,
      locale,
      months,
      onArrowPress,
      onDayPress,
      showExtraDays,
      theme: mergeTheme(theme),
    });

    useEffect(() => {
      dispatch({
        type: 'updateProps',
        payload: { horizontal, dates, locale, showExtraDays, months, theme: mergeTheme(theme) },
      });
    }, [horizontal, locale, showExtraDays, months, theme, dates]);

    useEffect(() => {
      dispatch({ type: 'updateComponents', payload: { Arrows, Day, DayNames, MonthTitle, Week } });
    }, [Arrows, Day, DayNames, MonthTitle, Week]);

    useEffect(() => {
      dispatch({ type: 'updateFunctions', payload: { onArrowPress, onDayPress } });
    }, [onArrowPress, onDayPress]);

    return (
      <CalendarContext.Provider value={state}>
        <CalendarUpdaterContext.Provider value={dispatch}>
          {children}
        </CalendarUpdaterContext.Provider>
      </CalendarContext.Provider>
    );
  },
);
