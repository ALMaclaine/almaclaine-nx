import { isRegex } from '../is-regex';

describe('lang/isRegex', function () {
  it('should detect if value is a RegExp', function () {
    expect(isRegex(/\w+/)).toBe(true);
    expect(isRegex(new RegExp('\\w+', 'g'))).toBe(true);

    expect(isRegex('')).toBe(false);
    expect(isRegex(123)).toBe(false);
    expect(isRegex(null)).toBe(false);
    expect(isRegex({})).toBe(false);
    expect(isRegex([])).toBe(false);
  });
});
