import React, { createContext, memo, ReactNode, useEffect, useReducer } from 'react';

import type { LibraryProps } from '../types';

import { calendarReducer } from './reducer';
import type { CalendarActions, CalendarState } from './types';

export const CalendarContext = createContext<CalendarState | undefined>(undefined);
export const CalendarUpdaterContext = createContext<React.Dispatch<CalendarActions>>(() => {});

type Props = Pick<LibraryProps, 'onArrowPress' | 'onDayPress'> & {
  children: ReactNode;
};

export const CalendarProvider = memo(({ children, onArrowPress, onDayPress }: Props) => {
  const [state, dispatch] = useReducer(calendarReducer, {
    onArrowPress,
    onDayPress,
  });

  useEffect(() => {
    dispatch({ type: 'updateFunctions', payload: { onArrowPress, onDayPress } });
  }, [onArrowPress, onDayPress]);

  return (
    <CalendarContext.Provider value={state}>
      <CalendarUpdaterContext.Provider value={dispatch}>{children}</CalendarUpdaterContext.Provider>
    </CalendarContext.Provider>
  );
});
