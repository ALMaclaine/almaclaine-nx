import { filter } from '../filter';

describe('array/filter()', function () {
  it('should filter items', function () {
    const items = [1, 2, 3, 4, 5];
    const result = filter(items, function (val) {
      return val % 2 !== 0;
    });

    expect(items.length).toEqual(5); //make sure it doesn't replace original array
    expect(result).toEqual([1, 3, 5]);
  });

  it('should loop all array items, even if sparse. see #64', function () {
    const items = new Array(6);
    items[2] = 3;
    items[5] = 8;
    let count = 0;

    const result = filter(items, function (val, i, arr) {
      expect(arr).toBe(items);
      expect(val).toBe(items[i]);
      count += 1;
      return val % 2 === 0;
    });

    expect(result).toEqual([8]);
    expect(count).toEqual(2);
  });

  it('should return empty array if no items match', function () {
    const items = [1, 2, 3, 4, 5];
    const result = filter(items, function () {
      return false;
    });

    expect(result).toEqual([]);
  });
});
