import { isSameSize } from '../is-same-size';

describe('array/isSameSize', function () {
  it('sameSize should work', function () {
    const a1 = [1, 2, 3];
    const a2 = [1, 3, 5];
    const a3 = [2, 4, 6];

    expect(isSameSize(a1, a2)).toBe(true);
    expect(isSameSize(a2, a3)).toBe(true);
    expect(isSameSize(a2, a3)).toBe(true);
    expect(isSameSize([], [])).toBe(true);

    expect(isSameSize([1], [])).toBe(false);
    expect(isSameSize([1, 2], [1])).toBe(false);
  });
});
