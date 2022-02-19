import type { NamedExoticComponent } from 'react';
import type { FlatListProps, TextStyle, ViewabilityConfig, ViewStyle } from 'react-native';

import type { ArrowsProps } from './components/Arrows';
import type { DayProps } from './components/Day';
import type { DayNamesProps } from './components/DayNames';
import type { MonthTitleProps } from './components/MonthTitle';
import type { WeekProps } from './components/Week';

export type CalendarDate = {
  dayString: string;
  year: string;
  month: string;
  day: string;
  dayOfWeek: number;
};

export type CalendarItem = [string, Array<CalendarDate>];

export type CalendarRef = {
  /**
   * Scrolling to provided month in `YYYY-MM` format.
   *
   * @param {string} monthString Month to which you want scroll. Format `YYYY-MM`.
   * @param {boolean} animated Defines if scrolling should be animated.
   */
  scrollTo: (monthString: string, animated?: boolean) => void;
};

export type Locale = {
  monthNames: Array<string>;
  monthNamesShort: Array<string>;
  dayNames: Array<string>;
  dayNamesShort: Array<string>;
};

export type Dots = {
  [key: string]: {
    color: string;
    selectedColor?: string;
  };
};

export type MarkedDate = {
  backgroundColor?: string;
  color?: string;
  dots?: Dots;
  endingDay?: boolean;
  inSeries?: boolean;
  selected?: boolean;
  startingDay?: boolean;
  extraDay?: boolean;
};

export type CalendarTheme = {
  dayNames?: { container?: ViewStyle; text?: TextStyle; textContainer?: ViewStyle };
  monthTitle?: { container?: ViewStyle; text?: TextStyle };
  week?: { container?: ViewStyle };
  day?: {
    container?: ViewStyle;
    endingDayContainer?: ViewStyle;
    extraDayContainer?: ViewStyle;
    extraDayText?: TextStyle;
    inSeriesContainer?: ViewStyle;
    pastDayContainer?: ViewStyle;
    pastDayText?: TextStyle;
    selectedContainer?: ViewStyle;
    selectedText?: TextStyle;
    startingDayContainer?: ViewStyle;
    text?: TextStyle;
    textContainer?: ViewStyle;
    todayContainer?: ViewStyle;
    todayText?: TextStyle;
  };
};

export type PickedFlatListProps =
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
  | 'scrollEnabled'
  | 'onScroll'
  | 'onScrollBeginDrag'
  | 'onScrollEndDrag'
  | 'onMomentumScrollEnd'
  | 'onMomentumScrollBegin';

export type LibraryProps = Pick<FlatListProps<Inexpressible>, PickedFlatListProps> & {
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
   * Shows days from previous / next month in first / last week. Default `false`.
   */
  showExtraDays?: boolean;

  /**
   * Shows arrows for switching month (only works with `horizontal` prop on true). Default `false`.
   */
  showArrows?: boolean;

  /**
   * If true, renders calendar horizontally. Additionally, adds `pagingEnabled` to FlatList.
   */
  horizontal?: boolean;

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
  markedDates?: Record<string, MarkedDate>;
  /**
   * TODO
   *
   * @ignore
   */
  theme?: CalendarTheme;

  Arrows?: NamedExoticComponent<ArrowsProps>;
  Day?: NamedExoticComponent<DayProps>;
  DayNames?: NamedExoticComponent<DayNamesProps>;
  MonthTitle?: NamedExoticComponent<MonthTitleProps>;
  Week?: NamedExoticComponent<WeekProps>;
};
