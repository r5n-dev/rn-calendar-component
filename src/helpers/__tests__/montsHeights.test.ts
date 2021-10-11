import generateDates from '../generateDates';
import monthsData from '../monthsData';
import monthsHeights from '../monthsHeights';

describe('monthsHeights', () => {
  describe('when 2020 data is provided', () => {
    test('should return individual month height and offset addition', () => {
      const dates = generateDates({
        startISODate: '2020-01-01',
        endISODate: '2020-12-31',
      });

      const data = monthsData(dates);
      const expectedResult = [
        { height: 312, offset: 0 },
        { height: 312, offset: 312 },
        { height: 312, offset: 624 },
        { height: 312, offset: 936 },
        { height: 360, offset: 1248 },
        { height: 312, offset: 1608 },
        { height: 312, offset: 1920 },
        { height: 360, offset: 2232 },
        { height: 312, offset: 2592 },
        { height: 312, offset: 2904 },
        { height: 312, offset: 3216 },
        { height: 312, offset: 3528 },
      ];

      expect(monthsHeights(data, 0)).toEqual(expectedResult);
      // second call to check if cache is returned;
      expect(monthsHeights(data, 0)).toEqual(expectedResult);
    });
  });
});
