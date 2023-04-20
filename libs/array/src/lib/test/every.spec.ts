import { every } from '../every';
import { isEven } from '@almaclaine/is';

describe('array/every', function () {
  it('should work on normal array', function () {
    const a1 = [1, 2, 3];
    const a2 = [1, 3, 5];
    const a3 = [2, 4, 6];

    expect(every(a1, isEven)).toBe(false);
    expect(every(a2, isEven)).toBe(false);
    expect(every(a3, isEven)).toBe(true);
  });

  it('should work on empty arrays', function () {
    //it is vacuously true that all elements of the empty set satisfy any given condition.
    expect(every([], isEven)).toBe(true);
  });

  it('should loop forwards to avoid undesired behavior', function () {
    // not that the loop order should matter on a truth check over all
    // elements
    const a1 = [1, 3, 7];
    const result: number[] = [];
    expect(
      every(a1, function (val) {
        result.push(val);
        return val !== 8;
      })
    ).toEqual(true);
    expect(result).toEqual([1, 3, 7]);
  });
});
