import type { NamedExoticComponent } from 'react';
import type { FlatListProps, TextStyle, ViewStyle } from 'react-native';

import type { ArrowsProps } from './components/Arrows';

export type CalendarDate = {
  dayIndex: number;
  dayString: string;
  year: string;
  month: string;
  day: string;
  dayOfWeek: number;
};

export type CalendarItem = [string, CalendarDate[]];

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
  monthNames: string[];
  monthNamesShort: string[];
  dayNames: string[];
  dayNamesShort: string[];
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
  | 'onMomentumScrollBegin'
  | 'onMomentumScrollEnd'
  | 'onScroll'
  | 'onScrollBeginDrag'
  | 'onScrollEndDrag'
  | 'removeClippedSubviews'
  | 'scrollEnabled'
  | 'showsHorizontalScrollIndicator'
  | 'showsVerticalScrollIndicator'
  | 'snapToAlignment'
  | 'snapToEnd'
  | 'snapToInterval'
  | 'snapToOffsets'
  | 'snapToStart'
  | 'updateCellsBatchingPeriod'
  | 'viewabilityConfig'
  | 'windowSize';

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
  onDayPress?: (date: Omit<CalendarDate, 'dayIndex' | 'dayOfWeek'>) => void;

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
   * TODO
   */
  markedDates?: Record<string, MarkedDate>;
  /**
   * TODO
   */
  theme?: CalendarTheme;

  Arrows?: NamedExoticComponent<ArrowsProps>;
};
