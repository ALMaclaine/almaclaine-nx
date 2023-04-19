import { sameSize } from '../same-size';

describe('array/sameSize', function () {
  it('sameSize should work', function () {
    const a1 = [1, 2, 3];
    const a2 = [1, 3, 5];
    const a3 = [2, 4, 6];

    expect(sameSize(a1, a2)).toBe(true);
    expect(sameSize(a2, a3)).toBe(true);
    expect(sameSize(a2, a3)).toBe(true);
    expect(sameSize([], [])).toBe(true);

    expect(sameSize([1], [])).toBe(false);
    expect(sameSize([1, 2], [1])).toBe(false);
  });
});
