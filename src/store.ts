import create from 'zustand';

import { constants } from './helpers';
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

export const defaultTheme: CalendarTheme = {
  day: {
    inSeriesContainer: {
      alignItems: 'center',
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      justifyContent: 'center',
      marginHorizontal: 0,
    },
    startingDayContainer: {
      borderBottomLeftRadius: constants.touchableSize / 2,
      borderBottomRightRadius: 0,
      borderTopLeftRadius: constants.touchableSize / 2,
      borderTopRightRadius: 0,
    },
    endingDayContainer: {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: constants.touchableSize / 2,
      borderTopLeftRadius: 0,
      borderTopRightRadius: constants.touchableSize / 2,
    },
    textContainer: {
      borderBottomLeftRadius: constants.touchableSize / 2,
      borderBottomRightRadius: constants.touchableSize / 2,
      borderTopLeftRadius: constants.touchableSize / 2,
      borderTopRightRadius: constants.touchableSize / 2,
      marginHorizontal: 5,
    },
    container: {
      alignItems: 'center',
      flex: 1,
      height: constants.touchableSize,
      justifyContent: 'center',
    },
    selectedContainer: { backgroundColor: 'turquoise' },
    text: { fontSize: 16, minWidth: 20, textAlign: 'center' },
    extraDayText: { color: 'lightgrey' },
    pastDayText: { color: 'lightgrey' },
    todayText: { color: 'dodgerblue', fontWeight: '700' },
  },
  dayNames: {
    textContainer: { alignItems: 'center', flex: 1 },
    container: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10 },
  },
  monthTitle: {
    container: { paddingVertical: 10 },
    text: { alignSelf: 'center', fontSize: 16 },
  },
  week: { container: { flexDirection: 'row' } },
};
