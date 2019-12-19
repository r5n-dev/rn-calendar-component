import { NamedExoticComponent } from 'react';
import { ViewabilityConfig } from 'react-native';

import { CalendarTheme, CalendarDate, MarkedDate, MarkedDates } from './types';

export type DayComponentProps = CalendarDate &
  MarkedDate & {
    theme?: CalendarTheme['day'];
    extraDay?: boolean;
    today: boolean;
    onPress?: (date: Omit<CalendarDate, 'dayOfWeek'>) => void;
  };

export type WeekComponentProps = {
  DayComponent: NamedExoticComponent<DayComponentProps>;
  dayTheme?: CalendarTheme['day'];
  markedDates: MarkedDates | null;
  onDayPress?: (date: Omit<CalendarDate, 'dayOfWeek'>) => void;
  theme?: CalendarTheme['week'];
  week: Array<CalendarDate>;
};

export type DayNamesComponentProps = {
  theme?: CalendarTheme['dayNames'];
  dayNames: Array<string>;
};

export type MonthTitleComponentProps = {
  theme?: CalendarTheme['monthTitle'];
  title: string;
};

export type CalendarProps = {
  DayComponent?: NamedExoticComponent<DayComponentProps>;
  DayNamesComponent?: NamedExoticComponent<DayNamesComponentProps>;
  MonthTitleComponent?: NamedExoticComponent<MonthTitleComponentProps>;
  WeekComponent?: NamedExoticComponent<WeekComponentProps>;

  // key should match pattern `YYYY-MM-DD`
  calendarHeight?: number;
  currentDay?: string;
  endISODate: string;
  firstDay?: 0 | 1;
  hideExtraDays?: boolean;
  locale?: string;
  markedDates?: MarkedDates;
  onDayPress?: (date: Omit<CalendarDate, 'dayOfWeek'>) => void;
  startISODate: string;
  style?: FixMe;
  viewabilityConfig?: ViewabilityConfig;
  theme?: CalendarTheme;
};
