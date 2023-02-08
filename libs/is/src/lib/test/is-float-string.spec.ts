import { isFloatString } from '../is-float-string';

describe('lang/isFloatString()', function () {
  it('should detect if value is a Number', function () {
    expect(isFloatString(0)).toBe(false);
    expect(isFloatString(123)).toBe(false);
    expect(isFloatString(Number(123))).toBe(false);
    expect(isFloatString('')).toBe(false);
    expect(isFloatString(false)).toBe(false);
    expect(isFloatString(null)).toBe(false);
    expect(isFloatString({})).toBe(false);
    expect(isFloatString(Number('123'))).toBe(false);
    expect(isFloatString(Number('123.1'))).toBe(false);
    expect(isFloatString('awd')).toBe(false);
    expect(isFloatString('0')).toBe(false);
    expect(isFloatString('10')).toBe(false);
    expect(isFloatString('-1')).toBe(false);
    expect(isFloatString('Infinity')).toBe(false);
    expect(isFloatString('-Infinity')).toBe(false);
    expect(isFloatString('NaN')).toBe(false);

    expect(isFloatString('10.1')).toBe(true);
    expect(isFloatString('-10.1')).toBe(true);
  });
});
