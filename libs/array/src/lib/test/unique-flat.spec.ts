import { uniqueFlat } from '../unique-flat';

describe('array/uniqueFlat()', function () {
  it('should keep only items that are present on 1st array but not present on other arrays', function () {
    const a = ['a', 'b', 1];
    const b = ['c', 1];
    const c = [1, 2, 3];

    expect(uniqueFlat(a, b, c)).toEqual(['a', 'b', 'c', 2, 3]);
  });

  it('should remove duplicates', function () {
    const a = ['a', 'b', 1, 'b'];
    const b = ['c', 'a', 1];
    const c = [1, 2, 3, 'a'];

    expect(uniqueFlat(a, b, c)).toEqual(['c', 2, 3]);
  });

  it('should return an empty array if items are present on other arrays', function () {
    const a = ['b', 'a', 'c', 1, 2, 3];
    const b = ['c', 'a'];
    const c = [1, 'b', 2, 3, 'a'];

    expect(uniqueFlat(a, b, c)).toEqual([]);
  });
});
