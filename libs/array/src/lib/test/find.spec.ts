import { find } from '../find';
import { isObject } from '@almaclaine/is';

describe('array/find', function () {
  it('should return first match', function () {
    const obj = { a: 'b' };
    const arr = [123, 'foo', 'bar', obj];

    expect(
      find(arr, function (val) {
        return val === 123;
      })
    ).toEqual(123);
    expect(
      find(arr, function (val) {
        return typeof val === 'string';
      })
    ).toEqual('foo');
    expect(
      find(arr, function (val) {
        return isObject(val) && val.a === 'b';
      })
    ).toEqual(obj);
  });
});
