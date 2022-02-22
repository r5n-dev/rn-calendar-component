import create from 'zustand';

import { defaultTheme } from './context/types';
import type { CalendarDate, CalendarTheme, LibraryProps, Locale, MarkedDate } from './types';

export type MarkedDates = Record<string, MarkedDate>;

type MarkedDatesState = {
  markedDates: MarkedDates;
  setMarkedDates: (markedDates: MarkedDates) => void;
};

type MonthsState = {
  months: [string, CalendarDate[]][];
  setMonths: (months: [string, CalendarDate[]][]) => void;
};

type CalendarConfigState = {
  firstDay: BinaryBoolean;
  horizontal: boolean | undefined;
  showExtraDays: boolean | undefined;
  locale: Locale;
  theme: CalendarTheme;
  listWidth: number;
  setCalendarConfig: (
    config: Omit<CalendarConfigState, 'setCalendarConfig' | 'setListWidth'>,
  ) => void;
  setListWidth: (listWidth: number) => void;
};

type CustomComponentsState = {
  Arrows: LibraryProps['Arrows'];
  Day: LibraryProps['Day'];
  DayNames: LibraryProps['DayNames'];
  MonthTitle: LibraryProps['MonthTitle'];
  Week: LibraryProps['Week'];
  setCustomComponents: (components: Omit<CustomComponentsState, 'setCustomComponents'>) => void;
};

type CallbacksState = {
  onArrowPress: LibraryProps['onArrowPress'];
  onDayPress: LibraryProps['onDayPress'];
  setCallbacks: (callbacks: Omit<CallbacksState, 'setCallbacks'>) => void;
};

export const useMarkedDates = create<MarkedDatesState>((set) => ({
  markedDates: {} as MarkedDates,
  setMarkedDates: (markedDates) => set({ markedDates }),
}));

export const useMonths = create<MonthsState>((set) => ({
  months: [],
  setMonths: (months: [string, CalendarDate[]][]) => set({ months }),
}));

export const useCalendarConfig = create<CalendarConfigState>((set) => ({
  firstDay: 0,
  horizontal: undefined,
  showExtraDays: undefined,
  locale: {} as Locale,
  theme: defaultTheme,
  listWidth: 0,
  setCalendarConfig: (config) => set(config),
  setListWidth: (listWidth) => set((state) => ({ ...state, listWidth })),
}));

export const useCustomComponents = create<CustomComponentsState>((set) => ({
  Arrows: undefined,
  Day: undefined,
  DayNames: undefined,
  MonthTitle: undefined,
  Week: undefined,
  setCustomComponents: (components) => set((state) => ({ ...state, ...components })),
}));

export const useCallbacksState = create<CallbacksState>((set) => ({
  onArrowPress: undefined,
  onDayPress: undefined,
  setCallbacks: (callbacks) => set((state) => ({ ...state, ...callbacks })),
}));
