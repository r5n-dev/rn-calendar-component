import { useCallback } from 'react';

import { useCalendarConfig } from '../store';
import type { CalendarTheme } from '../types';

const useTheme = <T extends keyof CalendarTheme>(themeKey: T) => {
  const theme = useCalendarConfig(useCallback((state) => state.theme?.[themeKey], [themeKey]));
  return theme;
};

export default useTheme;
