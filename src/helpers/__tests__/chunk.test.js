import chunk from '../chunk';

describe('chunk', () => {
  describe('when array and chunkLength is provided', () => {
    it('should return array of 3 arrays with 3 elements each', () => {
      const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      const expectedArray = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ];

      expect(chunk(array, 3)).toEqual(expectedArray);
    });

    it('should return array of 2 arrays with 3 and 1 element', () => {
      const array = [1, 2, 3, 4];
      const expectedArray = [[1, 2, 3], [4]];

      expect(chunk(array, 3)).toEqual(expectedArray);
    });
  });

  describe('when chunkLength is not provided', () => {
    it('should return empty array of arrays', () => {
      expect(chunk([1, 2, 3])).toEqual([[]]);
    });
  });
});
