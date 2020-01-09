import generateDates from '../generateDates';

describe('generateDates', () => {
  describe('when ISO string is provided', () => {
    test('should return date range between 2 dates', () => {
      const firstExpectedDates = [
        {
          day: '1',
          dayOfWeek: 2,
          dayString: '2019-01-01',
          month: '01',
          year: '2019',
        },
        {
          day: '2',
          dayOfWeek: 3,
          dayString: '2019-01-02',
          month: '01',
          year: '2019',
        },
        {
          day: '3',
          dayOfWeek: 4,
          dayString: '2019-01-03',
          month: '01',
          year: '2019',
        },
      ];

      expect(
        generateDates({ startISODate: '2019-01-01', endISODate: '2019-01-03' })
      ).toEqual(firstExpectedDates);

      const secondExpectedDates = [
        {
          dayOfWeek: 5,
          dayString: '2019-03-29',
          year: '2019',
          month: '03',
          day: '29',
        },
        {
          dayOfWeek: 6,
          dayString: '2019-03-30',
          year: '2019',
          month: '03',
          day: '30',
        },
        {
          dayOfWeek: 0,
          dayString: '2019-03-31',
          year: '2019',
          month: '03',
          day: '31',
        },
        {
          dayOfWeek: 1,
          dayString: '2019-04-01',
          year: '2019',
          month: '04',
          day: '1',
        },
        {
          dayOfWeek: 2,
          dayString: '2019-04-02',
          year: '2019',
          month: '04',
          day: '2',
        },
        {
          dayOfWeek: 3,
          dayString: '2019-04-03',
          year: '2019',
          month: '04',
          day: '3',
        },
      ];

      expect(
        generateDates({ startISODate: '2019-03-29', endISODate: '2019-04-03' })
      ).toEqual(secondExpectedDates);

      expect(
        generateDates({ startISODate: '2019', endISODate: '2019' })
      ).toEqual([firstExpectedDates[0]]);
    });
  });

  describe('when invalid dates are provided', () => {
    test('should return empty array', () => {
      expect(generateDates({})).toEqual([]);
      expect(generateDates({ startISODate: '', endISODate: '' })).toEqual([]);
      expect(
        generateDates({ startISODate: 'asdf', endISODate: 'ghjk' })
      ).toEqual([]);
    });
  });
});
