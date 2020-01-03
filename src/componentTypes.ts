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

  /**
   * Starting date for calendar. i.e. 2020-01-01.
   */
  startISODate: string;

  /**
   * Ending date for calendar. i.e. 2020-12-31.
   */
  endISODate: string;

  /**
   * Height of calendar view.
   */
  calendarHeight?: number;

  /**
   * Current day highlighted on start. Default is today.
   */
  currentDay?: string;

  /**
   * First day of calendar. 0 means Sunday, 1 means Monday.
   */
  firstDay?: 0 | 1;

  /**
   * Hides days from previous / next month in first / last week.
   */
  hideExtraDays?: boolean;

  /**
   * Key string which exists in Locales object.
   */
  locale?: string;

  /**
   * Callback after day is pressed.
   */
  onDayPress?: (date: Omit<CalendarDate, 'dayOfWeek'>) => void;

  /**
   * Style object passed to main component (FlatList).
   */
  style?: FixMe;

  /**
   * ViewabilityConfig passed to FlatList.
   * See React-Native docs of VirtualizedList for reference.
   */
  viewabilityConfig?: ViewabilityConfig;

  /**
   * TODO
   */
  markedDates?: MarkedDates;
  /**
   * TODO
   */
  theme?: CalendarTheme;
};
