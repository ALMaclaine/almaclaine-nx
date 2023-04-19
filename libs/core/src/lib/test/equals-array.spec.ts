import { equalsArray } from '../equals-array';

describe('array/equals', function () {
  it('should check if array contains same elements', function () {
    expect(equalsArray([1, 2], [1, 2])).toBe(true);
    expect(equalsArray([2, 1], [1, 2])).toBe(false);
    expect(equalsArray([1, 2, 3], [1, 2])).toBe(false);
    expect(equalsArray([1, 3, 3], [1, 2, 4])).toBe(false);
  });

  it('should consider empty arrays as equal', function () {
    expect(equalsArray([], [])).toBe(true);
  });

  it('should allow custom compare functions', function () {
    const a = [1, 'bar', {}];
    const b = ['1', 'bar', {}];
    const compare = function (a: unknown, b: unknown) {
      return String(a) === String(b);
    };
    expect(equalsArray(a, b, compare)).toBe(true);
  });
});
