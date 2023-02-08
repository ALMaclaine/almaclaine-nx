import { isPrintable } from '../is-printable';

describe('lang/isNull()', function () {
  it('should detect if value is a Null', () => {
    expect(isPrintable(undefined)).toBe(false);

    expect(isPrintable(null)).toBe(false);
    expect(isPrintable('')).toBe(true);
    expect(isPrintable(123)).toBe(true);
    expect(isPrintable([])).toBe(true);
    expect(isPrintable({})).toBe(true);
  });
});
