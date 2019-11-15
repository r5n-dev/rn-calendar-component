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
