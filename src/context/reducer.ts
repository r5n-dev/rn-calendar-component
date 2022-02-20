import { CalendarActions, CalendarState, initialState } from './types';

export const calendarReducer = (state = initialState, action: CalendarActions): CalendarState => {
  switch (action.type) {
    case 'updateComponents':
    case 'updateFunctions':
    case 'updateProps':
      return { ...state, ...action.payload };
    case 'setListWidth':
      return { ...state, listWidth: action.payload };

    default:
      return state;
  }
};
