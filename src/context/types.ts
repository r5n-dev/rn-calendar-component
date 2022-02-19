import { constants } from '../helpers';
import { CalendarDate, CalendarTheme, LibraryProps, Locale } from '../types';

const theme: CalendarTheme = {
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
  dates: [] as Array<CalendarDate>,
  firstDay: 0 as BinaryBoolean,
  horizontal: undefined as undefined | boolean,
  listWidth: 0 as number,
  locale: {} as Locale,
  markedDates: undefined as LibraryProps['markedDates'],
  months: [] as Array<[string, Array<CalendarDate>]>,
  onArrowPress: undefined as LibraryProps['onArrowPress'],
  onDayPress: undefined as LibraryProps['onDayPress'],
  showExtraDays: undefined as undefined | boolean,
  theme: theme as LibraryProps['theme'],
};

export type CalendarState = typeof initialState;
export type CalendarActions =
  | { type: 'setListWidth'; payload: number }
  | { type: 'setMarkedDates'; payload: LibraryProps['markedDates'] }
  | {
      type: 'updateProps';
      payload: {
        dates?: Array<CalendarDate>;
        horizontal?: LibraryProps['horizontal'];
        locale?: Locale;
        months: typeof initialState['months'];
        showExtraDays?: LibraryProps['showExtraDays'];
        theme?: LibraryProps['theme'];
      };
    }
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
