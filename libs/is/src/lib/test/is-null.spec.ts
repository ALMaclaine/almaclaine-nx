import { isNull } from '../is-null';

describe('lang/isNull()', function () {
  it('should detect if value is a Null', () => {
    expect(isNull(null)).toBe(true);

    expect(isNull('')).toBe(false);
    expect(isNull(123)).toBe(false);
    expect(isNull([])).toBe(false);
    expect(isNull({})).toBe(false);
  });
});
