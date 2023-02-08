import { isInfinite } from '../is-infinite';

describe('lang/isInfinite', () => {
  it("should return true for all values that aren't finite", () => {
    expect(isInfinite(-Infinity)).toBe(true);
    expect(isInfinite(+Infinity)).toBe(true);
    expect(isInfinite('Infinity')).toBe(true);
  });

  it('should return false to all finite values', () => {
    expect(isInfinite('-123')).toBe(false);
    expect(isInfinite('123')).toBe(false);
    expect(isInfinite(Number(123))).toBe(false);
    expect(isInfinite(123)).toBe(false);
    expect(isInfinite(123.45)).toBe(false);
    expect(isInfinite(-123)).toBe(false);
    expect(isInfinite(-123.45)).toBe(false);
    expect(isInfinite(0)).toBe(false);
    expect(isInfinite(null)).toBe(false);
    expect(isInfinite(void 0)).toBe(false);
    expect(isInfinite(true)).toBe(false);
    expect(isInfinite(false)).toBe(false);
    expect(isInfinite(String(''))).toBe(false);
    expect(isInfinite(String('asd'))).toBe(false);
    expect(isInfinite('')).toBe(false);
    expect(isInfinite('asd')).toBe(false);
    expect(isInfinite([])).toBe(false);
    expect(isInfinite([1, 2, 3])).toBe(false);
    expect(isInfinite({})).toBe(false);
    expect(isInfinite({ a: 1, b: 'bar' })).toBe(false);
    expect(isInfinite(NaN)).toBe(false);
  });
});
