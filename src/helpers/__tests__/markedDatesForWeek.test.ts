import markedDatesForWeek from '../markedDatesForWeek';

describe('markedDatesForWeek', () => {
  describe('when full week is in markedDates', () => {
    test('should return objects first, last and days between as marked', () => {
      const week = [
        { dayString: '2019-01-01' },
        { dayString: '2019-01-02' },
        { dayString: '2019-01-03' },
        { dayString: '2019-01-04' },
        { dayString: '2019-01-05' },
        { dayString: '2019-01-06' },
        { dayString: '2019-01-07' },
      ];

      const markedDates = {
        '2019-01-01': { selected: true },
        '2019-01-02': { selected: true },
        '2019-01-03': { selected: true },
        '2019-01-04': { selected: true },
        '2019-01-05': { selected: true },
        '2019-01-06': { selected: true },
        '2019-01-07': { selected: true },
      };

      const expectedMarkedDates = {
        '2019-01-01': { selected: true, inSeries: true, startingDay: true },
        '2019-01-02': { selected: true, inSeries: true },
        '2019-01-03': { selected: true, inSeries: true },
        '2019-01-04': { selected: true, inSeries: true },
        '2019-01-05': { selected: true, inSeries: true },
        '2019-01-06': { selected: true, inSeries: true },
        '2019-01-07': { selected: true, inSeries: true, endingDay: true },
      };
      // @ts-expect-error
      expect(markedDatesForWeek(week, markedDates)).toEqual(expectedMarkedDates);
    });
  });

  describe('when there are few series in week', () => {
    test('should return objects first and last marked dates', () => {
      const week = [
        { dayString: '2019-01-01' },
        { dayString: '2019-01-02' },
        { dayString: '2019-01-03' },
        { dayString: '2019-01-04' },
        { dayString: '2019-01-05' },
        { dayString: '2019-01-06' },
        { dayString: '2019-01-07' },
      ];

      const markedDates = {
        '2019-01-01': { selected: true },
        '2019-01-02': { selected: true },
        '2019-01-04': { selected: true },
        '2019-01-05': { selected: true },
        '2019-01-06': { selected: true },
        '2019-01-07': { selected: true },
      };

      const expectedMarkedDates = {
        '2019-01-01': { selected: true, inSeries: true, startingDay: true },
        '2019-01-02': { selected: true, inSeries: true, endingDay: true },
        '2019-01-04': { selected: true, inSeries: true, startingDay: true },
        '2019-01-05': { selected: true, inSeries: true },
        '2019-01-06': { selected: true, inSeries: true },
        '2019-01-07': { selected: true, inSeries: true, endingDay: true },
      };
      // @ts-expect-error
      expect(markedDatesForWeek(week, markedDates)).toEqual(expectedMarkedDates);
    });
  });

  describe('when single dates are marked but not in series', () => {
    test('should return normal marked dates', () => {
      const week = [
        { dayString: '2019-01-01' },
        { dayString: '2019-01-02' },
        { dayString: '2019-01-03' },
        { dayString: '2019-01-04' },
        { dayString: '2019-01-05' },
        { dayString: '2019-01-06' },
        { dayString: '2019-01-07' },
      ];

      const markedDates = {
        '2019-01-01': { selected: true },
        '2019-01-03': { selected: true },
        '2019-01-05': { selected: true },
        '2019-01-07': { selected: true },
      };

      const expectedMarkedDates = {
        '2019-01-01': { selected: true },
        '2019-01-03': { selected: true },
        '2019-01-05': { selected: true },
        '2019-01-07': { selected: true },
      };
      // @ts-expect-error
      expect(markedDatesForWeek(week, markedDates)).toEqual(expectedMarkedDates);
    });
  });

  describe('when single dates and series are mixed up', () => {
    test('should return normal marked dates for single dates and series', () => {
      const week = [
        { dayString: '2019-01-01' },
        { dayString: '2019-01-02' },
        { dayString: '2019-01-03' },
        { dayString: '2019-01-04' },
        { dayString: '2019-01-05' },
        { dayString: '2019-01-06' },
        { dayString: '2019-01-07' },
      ];

      const markedDates = {
        '2019-01-01': { selected: true },
        '2019-01-02': { selected: true },
        '2019-01-03': { selected: true },
        '2019-01-05': { selected: true },
        '2019-01-07': { selected: true },
      };

      const expectedMarkedDates = {
        '2019-01-01': { selected: true, inSeries: true, startingDay: true },
        '2019-01-02': { selected: true, inSeries: true },
        '2019-01-03': { selected: true, inSeries: true, endingDay: true },
        '2019-01-05': { selected: true },
        '2019-01-07': { selected: true },
      };
      // @ts-expect-error
      expect(markedDatesForWeek(week, markedDates)).toEqual(expectedMarkedDates);
    });
  });

  describe('when markedDates does not contain provided week dates', () => {
    const week = [
      { dayString: '2019-01-01' },
      { dayString: '2019-01-02' },
      { dayString: '2019-01-03' },
      { dayString: '2019-01-04' },
      { dayString: '2019-01-05' },
      { dayString: '2019-01-06' },
      { dayString: '2019-01-07' },
    ];

    const markedDates = {
      '2019-01-08': { selected: true },
    };
    // @ts-expect-error
    expect(markedDatesForWeek(week, markedDates)).toEqual(null);
  });

  describe('when markedDates are not provided', () => {
    test('should return null', () => {
      expect(markedDatesForWeek([])).toEqual(null);
    });
  });

  describe('when markedDates are empty object', () => {
    test('should return null', () => {
      expect(markedDatesForWeek([], {})).toEqual(null);
    });
  });
});
