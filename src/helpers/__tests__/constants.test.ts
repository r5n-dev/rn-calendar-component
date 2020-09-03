/**
 * This test ensures that no one will change accidentally values
 */

import constants from '../constants';

describe('constants', () => {
  test('should check constant values', () => {
    expect(constants.dotSize).toEqual(6);
    expect(constants.touchableSize).toEqual(48);
    expect(constants.monthHeaderHeight).toEqual(72);
    expect(constants.weekLength).toEqual(7);
    expect(constants.todayDate).toEqual(new Date().toISOString().split('T')[0]);
    expect(constants.dayInMs).toEqual(1000 * 60 * 60 * 24);
  });
});
