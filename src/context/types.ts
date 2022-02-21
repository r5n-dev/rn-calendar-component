import { constants } from '../helpers';
import type { CalendarTheme, LibraryProps } from '../types';

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

export const initialState = {
  Arrows: undefined as LibraryProps['Arrows'],
  Day: undefined as LibraryProps['Day'],
  DayNames: undefined as LibraryProps['DayNames'],
  MonthTitle: undefined as LibraryProps['MonthTitle'],
  Week: undefined as LibraryProps['Week'],
  onArrowPress: undefined as LibraryProps['onArrowPress'],
  onDayPress: undefined as LibraryProps['onDayPress'],
};

export type CalendarState = typeof initialState;
export type CalendarActions =
  | {
      type: 'updateFunctions';
      payload: {
        onArrowPress?: LibraryProps['onArrowPress'];
        onDayPress?: LibraryProps['onDayPress'];
      };
    }
  | {
      type: 'updateComponents';
      payload: {
        Arrows?: LibraryProps['Arrows'];
        Day?: LibraryProps['Day'];
        MonthTitle?: LibraryProps['MonthTitle'];
        DayNames?: LibraryProps['DayNames'];
        Week?: LibraryProps['Week'];
      };
    };
