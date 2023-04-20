import { compact } from '../compact';

describe('array/compact()', function () {
  it('should remove null and undefined items', function () {
    const arr = [1, 2, null, false, '', 'foo', undefined];
    arr[10] = 'bar';

    expect(compact(arr).length).toBe(6);
    expect(compact(arr)).toEqual([1, 2, false, '', 'foo', 'bar']);
  });

  it('should remove all falsy values', function () {
    const arr = [1, 2, null, false, '', 'foo', undefined];
    arr[10] = 'bar';

    expect(compact(arr, true).length).toBe(4);
    expect(compact(arr, true)).toEqual([1, 2, 'foo', 'bar']);
  });

  it('should return empty array if source array is null/undefined', function () {
    expect(compact(undefined)).toEqual([]);
  });
});
