import { findIndex } from '../find-index';
import { isString } from '@almaclaine/is';

describe('array/findIndex', function () {
  it('should return index of first match', function () {
    const items = [1, { a: 1 }, 1, 'foo', 'bar', { a: 1 }];

    const findOne = function (val: unknown) {
      return val === 1;
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const findObj = function (val: any) {
      return val?.a === 1;
    };

    expect(findIndex(items, findOne)).toEqual(0);
    expect(findIndex(items, isString)).toEqual(3);
    expect(findIndex(items, findObj)).toEqual(1);
  });

  it('should return -1 when not found', function () {
    const items = [1, { a: 1 }, 1, 'foo', 'bar', { a: 1 }];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const findTwo = function (val: any) {
      return val === 2;
    };

    expect(findIndex(items, findTwo)).toEqual(-1);
  });
});
