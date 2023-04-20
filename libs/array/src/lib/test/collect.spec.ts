import { collect } from '../collect';

describe('array/collect', function () {
  it('should map items and concatenate results', function () {
    const source = [0, 1, 2, 3];
    const result = collect(source, function (value) {
      let i = 0;
      const arr = [];
      while (i++ < value) {
        arr.push(value);
      }
      return arr;
    });

    expect(result).toEqual([1, 2, 2, 3, 3, 3]);
  });

  it('should allow undefined map result', function () {
    const source = [1, 2, 3, 4];
    const result = collect(source, function (value) {
      if (value % 2 !== 0) {
        return [value];
      }
      return [];
    });

    expect(result).toEqual([1, 3]);
  });

  it('should loop even if array is sparse', function () {
    function toOne() {
      return [1];
    }

    const base = new Array(3);
    let result = collect(base, toOne);
    expect(result).toEqual([1, 1, 1]);

    base[5] = 'foo';
    result = collect(base, toOne);
    expect(result).toEqual([1, 1, 1, 1, 1, 1]);
  });
});
