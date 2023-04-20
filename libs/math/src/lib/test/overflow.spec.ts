import { overflow } from '../overflow';

describe('math/overflow', function () {
  it('should return number if within bounds', function () {
    expect(overflow(10, 0, 20)).toBe(10);
    expect(overflow(15, 30)).toBe(15);
    expect(overflow(0, -5, 5)).toBe(0);
    expect(overflow(-10, -10, -5)).toBe(-10);
    expect(overflow(10, 0, 10)).toBe(0);
    expect(overflow(3, 3, 10)).toBe(3);
  });

  it('should wrap number lower then min', function () {
    expect(overflow(2, 5, 10)).toBe(7);
    expect(overflow(1, 10, 14)).toBe(13);
    expect(overflow(-13, -10, -5)).toBe(-8);
  });

  it('no -0', function () {
    expect(overflow(-0, -0, 10)).toBe(0);
  });
});
