import { CalendarActions, CalendarState, initialState } from './types';

export const calendarReducer = (state = initialState, action: CalendarActions): CalendarState => {
  switch (action.type) {
    case 'updateComponents':
    case 'updateFunctions':
      return { ...state, ...action.payload };

    default:
      return state;
  }
};
