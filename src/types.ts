import { ViewStyle, TextStyle } from 'react-native';

export type CalendarDate = {
  dayString: string;
  year: string;
  month: string;
  day: string;
  dayOfWeek: number;
};

export type CalendarItem = [string, CalendarDate];

export type Locale = {
  monthNames: Array<string>;
  monthNamesShort: Array<string>;
  dayNames: Array<string>;
  dayNamesShort: Array<string>;
};

export type Locales = {
  [key: string]: Locale;
};

export type MarkedDate = {
  color?: string;
  backgroundColor?: string;
  selected?: boolean;
  endingDay?: boolean;
  startingDay?: boolean;
  inSeries?: boolean;
};

export type MarkedDates = {
  [key: string]: MarkedDate;
};

export type CalendarTheme = {
  day?: {
    container?: ViewStyle;
    extraDayContainer?: ViewStyle;
    extraDayText?: TextStyle;
    selectedContainer?: ViewStyle;
    selectedText?: TextStyle;
    text?: TextStyle;
    todayContainer: ViewStyle;
    todayText?: TextStyle;
  };
  dayNames?: {
    container?: ViewStyle;
    text?: TextStyle;
  };
  monthTitle?: {
    container?: ViewStyle;
    text: TextStyle;
  };
  week?: {
    container?: ViewStyle;
  };
};
