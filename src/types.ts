import { NamedExoticComponent } from 'react';

export type CalendarDate = {
  dayString: string;
  year: string;
  month: string;
  day: string;
  dayOfWeek: number;
};

export type Locale = {
  monthNames: Array<string>;
  monthNamesShort: Array<string>;
  dayNames: Array<string>;
  dayNamesShort: Array<string>;
};

export type Locales = {
  [key: string]: Locale;
};

export type CalendarItem = [string, CalendarDate];
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

export type DayComponentProps = CalendarDate &
  MarkedDate & {
    onPress?: (date: Omit<CalendarDate, 'dayOfWeek'>) => void;
  };

export type WeekComponentProps = {
  week: Array<CalendarDate>;
  onDayPress?: (date: Omit<CalendarDate, 'dayOfWeek'>) => void;
  markedDates: MarkedDates | null;
  DayComponent: NamedExoticComponent<DayComponentProps>;
};

export type DayNamesComponentProps = {
  dayNames: Array<string>;
};

export type MonthTitleComponentProps = {
  title: string;
};
