import { isUndefined } from '../is-undefined';

describe('lang/isNull()', function () {
  it('should detect if value is a Null', () => {
    expect(isUndefined(undefined)).toBe(true);

    expect(isUndefined(null)).toBe(false);
    expect(isUndefined('')).toBe(false);
    expect(isUndefined(123)).toBe(false);
    expect(isUndefined([])).toBe(false);
    expect(isUndefined({})).toBe(false);
  });
});
