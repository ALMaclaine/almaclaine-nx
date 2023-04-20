import { findIndexLast } from '../find-index-last';
import { isString } from '@almaclaine/is';

describe('array/findLastIndex', function () {
  it('should return index of first match starting from end of array', function () {
    const items = [1, { a: 1 }, 1, 'foo', 'bar', { a: 1 }];

    const findOne = function (val: unknown) {
      return val === 1;
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const findObj = function (val: any) {
      return val.a === 1;
    };

    expect(findIndexLast(items, findOne)).toEqual(2);
    expect(findIndexLast(items, isString)).toEqual(4);
    expect(findIndexLast(items, findObj)).toEqual(5);
  });

  it('should return -1 when not found', function () {
    const items = [1, { a: 1 }, 1, 'foo', 'bar', { a: 1 }];
    const findTwo = function (val: unknown) {
      return val === 2;
    };

    expect(findIndexLast(items, findTwo)).toEqual(-1);
  });
});
