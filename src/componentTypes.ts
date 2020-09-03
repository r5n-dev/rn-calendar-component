import { NamedExoticComponent } from 'react';
import { ViewabilityConfig, FlatListProps } from 'react-native';

import {
  CalendarTheme,
  CalendarDate,
  CalendarItem,
  MarkedDate,
  MarkedDates,
  Locale,
} from './types';

/**
 * Day related types
 */
export type DayComponentProps = CalendarDate &
  MarkedDate & {
    extraDay?: boolean;
    listWidth: number;
    onPress?: (date: Omit<CalendarDate, 'dayOfWeek'>) => void;
    theme?: CalendarTheme['day'];
    today: boolean;
  };

/**
 * Week related types
 */
export type WeekComponentProps = {
  Day: NamedExoticComponent<DayComponentProps>;
  listWidth: number;
  dayTheme?: CalendarTheme['day'];
  markedDates?: MarkedDates;
  onDayPress?: (date: Omit<CalendarDate, 'dayOfWeek'>) => void;
  theme?: CalendarTheme['week'];
  week: Array<CalendarDate>;
};

/**
 * Month related types
 */
export type MonthComponentProps = {
  Day: NamedExoticComponent<DayComponentProps>;
  DayNames: NamedExoticComponent<DayNamesComponentProps>;
  MonthTitle: NamedExoticComponent<MonthTitleComponentProps>;
  Week: NamedExoticComponent<WeekComponentProps>;
  dates: Array<CalendarDate>;
  firstDay: BinaryBoolean;
  hideExtraDays: boolean;
  horizontal?: boolean;
  index: number;
  item: CalendarItem;
  listWidth: number;
  locales: Locale;
  markedDates?: MarkedDates;
  months: Array<CalendarItem>;
  onDayPress?: (date: Omit<CalendarDate, 'dayOfWeek'>) => void;
  theme?: CalendarTheme;
};

export type DayNamesComponentProps = {
  dayNames: Array<string>;
  theme?: CalendarTheme['dayNames'];
};

export type MonthTitleComponentProps = {
  theme?: CalendarTheme['monthTitle'];
  title: string;
};

export type ArrowsComponentProps = {
  leftArrowDisabled: boolean;
  listWidth: number;
  onArrowPress: (direction: 'left' | 'right') => void;
  rightArrowDisabled: boolean;
};

type PickedFlatListProps =
  | 'initialNumToRender'
  | 'maxToRenderPerBatch'
  | 'removeClippedSubviews'
  | 'updateCellsBatchingPeriod'
  | 'windowSize'
  | 'showsHorizontalScrollIndicator'
  | 'showsVerticalScrollIndicator'
  | 'snapToAlignment'
  | 'snapToInterval'
  | 'snapToOffsets'
  | 'snapToStart'
  | 'snapToEnd'
  | 'onScroll'
  | 'onScrollBeginDrag'
  | 'onScrollEndDrag'
  | 'onMomentumScrollEnd'
  | 'onMomentumScrollBegin';

export type CalendarProps = Pick<
  FlatListProps<Inexpressible>,
  PickedFlatListProps
> & {
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
  firstDay?: BinaryBoolean;

  /**
   * Hides days from previous / next month in first / last week. Default `true`.
   */
  hideExtraDays?: boolean;

  /**
   * Hides arrows for switching month (only works with `horizontal` prop on true). Default `true`.
   */
  hideArrows?: boolean;

  /**
   * If true, renders calendar horizontally. Additionally, adds `pagingEnabled` to FlatList.
   */
  horizontal?: boolean;

  /**
   * Defines if Calendar can be scrolled. Default `true`.
   */
  scrollEnabled?: boolean;

  /**
   * Callback after day is pressed.
   *
   * @param {Object} date
   * @param {number} date.day Day number of month.
   * @param {number} date.month Month number of year (from 0 to 11).
   * @param {number} date.year Year.
   * @param {number} date.dayString Date. (YYYY-MM-DD).
   */
  onDayPress?: (date: Omit<CalendarDate, 'dayOfWeek'>) => void;

  /**
   * Gets called when the user clicks on the button
   *
   * @param {'left' | 'right'} direction Direction in which calendar will move.
   * @param {number} currentMonthIndex Index of current visible month.
   * @param {number} lastMonthIndex Index of last month generated.
   */
  onArrowPress?: (params: {
    direction: 'left' | 'right';
    currentMonthIndex: number;
    lastMonthIndex: number;
  }) => void;

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
   *
   * @ignore
   */
  markedDates?: MarkedDates;
  /**
   * TODO
   *
   * @ignore
   */
  theme?: CalendarTheme;

  ArrowsComponent?: NamedExoticComponent<ArrowsComponentProps>;
  DayComponent?: NamedExoticComponent<DayComponentProps>;
  DayNamesComponent?: NamedExoticComponent<DayNamesComponentProps>;
  MonthTitleComponent?: NamedExoticComponent<MonthTitleComponentProps>;
  WeekComponent?: NamedExoticComponent<WeekComponentProps>;
};
