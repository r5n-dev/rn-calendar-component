import create from 'zustand';

import { defaultTheme } from './context/types';
import type { CalendarDate, CalendarTheme, Locale, MarkedDate } from './types';

export type MarkedDates = Record<string, MarkedDate>;

type MarkedDatesState = {
  markedDates: MarkedDates;
  setMarkedDates: (markedDates: MarkedDates) => void;
};

type MonthsState = {
  months: [string, CalendarDate[]][];
  setMonths: (months: [string, CalendarDate[]][]) => void;
};

type DatesState = {
  dates: CalendarDate[];
  setDates: (dates: CalendarDate[]) => void;
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

export const useMarkedDates = create<MarkedDatesState>((set) => ({
  markedDates: {} as MarkedDates,
  setMarkedDates: (markedDates) => set({ markedDates }),
}));

export const useMonths = create<MonthsState>((set) => ({
  months: [],
  setMonths: (months: [string, CalendarDate[]][]) => set({ months }),
}));

export const useDates = create<DatesState>((set) => ({
  dates: [],
  setDates: (dates) => set({ dates }),
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
