import { NamedExoticComponent } from 'react';
import { ViewabilityConfig, FlatListProps } from 'react-native';

import { CalendarTheme, CalendarDate, MarkedDate, MarkedDates } from './types';

export type DayComponentProps = CalendarDate &
  MarkedDate & {
    extraDay?: boolean;
    listWidth: number;
    onPress?: (date: Omit<CalendarDate, 'dayOfWeek'>) => void;
    theme?: CalendarTheme['day'];
    today: boolean;
  };

export type WeekComponentProps = {
  DayComponent: NamedExoticComponent<DayComponentProps>;
  listWidth: number;
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

export type ArrowsComponentProps = {
  leftArrowDisabled: boolean;
  onArrowPress: (direction: 'left' | 'right') => void;
  rightArrowDisabled: boolean;
};

export type CalendarProps = {
  /**
   * Starting date for calendar. i.e. 2020-01-01.
   */
  startISODate: string;

  /**
   * Ending date for calendar. i.e. 2020-12-31.
   */
  endISODate: string;

  /**
   * Day to which calendar is initially scrolled. Default is today.
   */
  currentDay?: string;

  /**
   * Key string which exists in Locales object.
   */
  locale?: string;

  /**
   * Height of calendar view.
   */
  calendarHeight?: number;

  /**
   * First day of calendar. 0 means Sunday, 1 means Monday.
   */
  firstDay?: 0 | 1;

  /**
   * Hides days from previous / next month in first / last week.
   */
  hideExtraDays?: boolean;

  /**
   * Hides arrows for switching month (only works with `horizontal` prop on true).
   */
  hideArrows?: boolean;

  /**
   * If true, renders calendar horizontally. Additionally, adds `pagingEnabled` to FlatList.
   */
  horizontal?: boolean;

  /**
   * Defines if Calendar can be scrolled
   */
  scrollEnabled?: boolean;

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

  DayComponent?: NamedExoticComponent<DayComponentProps>;
  DayNamesComponent?: NamedExoticComponent<DayNamesComponentProps>;
  MonthTitleComponent?: NamedExoticComponent<MonthTitleComponentProps>;
  WeekComponent?: NamedExoticComponent<WeekComponentProps>;

  onScrollBeginDrag?: FlatListProps<Inexpressible>['onScrollBeginDrag'];
  onMomentumScrollEnd?: FlatListProps<Inexpressible>['onMomentumScrollEnd'];
};
