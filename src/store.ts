import create from 'zustand';

import type { MarkedDate } from './types';

export type MarkedDates = Record<string, MarkedDate>;

type MarkedDatesState = {
  markedDates: MarkedDates;
  setMarkedDates: (markedDates: MarkedDates) => void;
};

export const useMarkedDates = create<MarkedDatesState>((set) => ({
  markedDates: {} as MarkedDates,
  setMarkedDates: (markedDates: MarkedDates) => set({ markedDates }),
}));
