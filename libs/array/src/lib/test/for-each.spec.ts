import { forEach } from '../for-each';

describe('array/forEach()', function () {
  it('should loop and pass params to callback', function () {
    let result = 0;
    const items = [1, 2, 3, 4, 5];

    forEach(items, function (val, i, arr) {
      expect(arr).toBe(items);
      expect(val).toBe(items[i]);
      result += val;
    });

    expect(result).toBe(15);
  });

  it('should normalize sparse arrays behavior. see #64', function () {
    // IMPORTANT!
    // ----------
    // this behavior is different than ES5 Array#forEach
    // there is no way to support sparse arrays properly on IE 7-8
    // so we dropped sparse array support altogether. see #64

    const arr1 = new Array(6);
    arr1[2] = 3;
    arr1[5] = 8;
    arr1[10] = undefined; // it's a trap!

    const result: unknown[] = [];

    forEach(arr1, function (val, i, arr) {
      expect(arr).toBe(arr1);
      expect(val).toBe(arr1[i]);
      result.push(val);
      return true;
    });

    expect(result[0]).toEqual(undefined);
    expect(result[1]).toEqual(undefined);
    expect(result[2]).toEqual(3);
    expect(result[5]).toEqual(8);
    expect(result[10]).toEqual(undefined);
    expect(result.length).toEqual(11);
  });

  it('should allow exiting the iteration early. see #94', function () {
    const arr = [1, 2, 3, 4, 5];
    let count = 0;

    forEach(arr, function () {
      count++;
      return count !== 2;
    });

    expect(count).toBe(2);
  });
});
