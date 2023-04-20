import { indexOf } from '../index-of';

describe('array/indexOf()', function () {
  it('should work in regular arrays', function () {
    const arr = [1, 'a', 2, 'b'];

    expect(indexOf(arr, 1)).toEqual(0);
    expect(indexOf(arr, 'a')).toEqual(1);
    expect(indexOf(arr, 2)).toEqual(2);
    expect(indexOf(arr, 'b')).toEqual(3);

    expect(indexOf(arr, 'foo')).toEqual(-1);
  });

  it('should handle fromIndex', function () {
    const arr = [1, 'a', 2, 'b'];

    expect(indexOf(arr, 1, 2)).toEqual(-1);
    expect(indexOf(arr, 'a', 2)).toEqual(-1);
    expect(indexOf(arr, 2, 2)).toEqual(2);
    expect(indexOf(arr, 'b', 2)).toEqual(3);

    expect(indexOf(arr, 'foo', 2)).toEqual(-1);
  });

  it('should handle fromIndex in sparse arrays. see #64', function () {
    const arr = [];
    arr[1] = 1;
    arr[3] = 'a';
    arr[6] = 2;
    arr[8] = 'b';

    expect(indexOf(arr, 1, 4)).toEqual(-1);
    expect(indexOf(arr, 'a', 4)).toEqual(-1);
    expect(indexOf(arr, 2, 4)).toEqual(6);
    expect(indexOf(arr, 'b', 4)).toEqual(8);

    expect(indexOf(arr, 'foo', 4)).toEqual(-1);
  });

  it('should handle negative fromIndex', function () {
    const arr = [1, 'a', 2, 'b'];

    expect(indexOf(arr, 1, -2)).toEqual(-1);
    expect(indexOf(arr, 'a', -2)).toEqual(-1);
    expect(indexOf(arr, 2, -2)).toEqual(2);
    expect(indexOf(arr, 'b', -2)).toEqual(3);

    expect(indexOf(arr, 'foo', -2)).toEqual(-1);
  });

  it('should handle fromIndex greater than length', function () {
    const arr = [1, 'a', 2, 'b'];

    expect(indexOf(arr, 1, 15)).toEqual(-1);
    expect(indexOf(arr, 'a', 15)).toEqual(-1);
    expect(indexOf(arr, 2, 15)).toEqual(-1);
    expect(indexOf(arr, 'b', 15)).toEqual(-1);

    expect(indexOf(arr, 'foo', 15)).toEqual(-1);
  });
});
