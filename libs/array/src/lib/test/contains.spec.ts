import { contains } from '../contains';

describe('array/contains()', function () {
  it('should check for existence', function () {
    const arr = [1, 2, 3, 1, 5];
    expect(contains(arr, 2)).toBe(true);
    expect(contains(arr, 4)).toBe(false);
    expect(contains(arr, 1, 1)).toBe(true);
    expect(contains(arr, 1, 3)).toBe(true);
    expect(contains(arr, 1, 4)).toBe(false);
  });
});
