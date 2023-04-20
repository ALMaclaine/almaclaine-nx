import { findLast } from '../find-last';

describe('array/findLast', function () {
  it('should return last match', function () {
    const obj = { a: 'b' };
    const arr = [123, 'foo', 'bar', obj];

    expect(
      findLast(arr, function (val: unknown) {
        return val === 123;
      })
    ).toEqual(123);
    expect(
      findLast(arr, function (val: unknown) {
        return typeof val === 'string';
      })
    ).toEqual('bar');
    expect(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      findLast(arr, function (val: any) {
        return val.a === 'b';
      })
    ).toEqual(obj);
  });
});
