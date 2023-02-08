import { isSized } from '../is-sized';

describe('lang/isSized', function () {
  it('should detect if value is a Null', () => {
    expect(isSized(undefined)).toBe(false);
    expect(isSized(null)).toBe(false);
    expect(isSized('')).toBe(false);
    expect(isSized(123)).toBe(false);
    expect(isSized([])).toBe(true);
    expect(isSized({ length: 2 })).toBe(true);
    expect(isSized({})).toBe(false);
  });
});
