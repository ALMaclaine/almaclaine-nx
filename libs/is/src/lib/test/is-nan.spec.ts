import { isNaN } from '../is-nan';

describe('lang/isNaN', () => {
  it("should return true for everything that isn't a number", () => {
    expect(isNaN(NaN)).toBe(true);
    expect(isNaN(Number(NaN))).toBe(true);
  });

  it('should return false if value is a REAL number', () => {
    expect(isNaN(true)).toBe(false);
    expect(isNaN(false)).toBe(false);
    expect(isNaN('000123')).toBe(false);
    expect(isNaN('dolor123bar')).toBe(false);
    expect(isNaN({})).toBe(false);
    expect(isNaN([])).toBe(false);
    expect(isNaN([1, 2])).toBe(false);
    expect(isNaN('')).toBe(false);
    expect(isNaN(null)).toBe(false);
    expect(isNaN(undefined)).toBe(false);
    expect(isNaN(123)).toBe(false);
    expect(isNaN(Number(123))).toBe(false);
    expect(isNaN(Number('123'))).toBe(false);
  });
});
