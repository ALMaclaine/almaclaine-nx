import { isString } from '../is-string';

describe('lang/isString()', function () {
  it('should detect if value is a string', function () {
    expect(isString('foo')).toBe(true);
    expect(isString(String('lorem'))).toBe(true);
    expect(isString(String(123))).toBe(true);

    expect(isString(null)).toBe(false);
    expect(isString(12)).toBe(false);
    expect(isString(false)).toBe(false);
  });
});
