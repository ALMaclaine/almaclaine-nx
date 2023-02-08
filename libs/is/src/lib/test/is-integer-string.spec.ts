import { isIntegerString } from '../is-integer-string';

describe('lang/isIntegerString()', function () {
  it('should detect if value is a Number', function () {
    expect(isIntegerString(0)).toBe(false);
    expect(isIntegerString(123)).toBe(false);
    expect(isIntegerString(Number(123))).toBe(false);
    expect(isIntegerString('')).toBe(false);
    expect(isIntegerString(false)).toBe(false);
    expect(isIntegerString(null)).toBe(false);
    expect(isIntegerString({})).toBe(false);
    expect(isIntegerString(Number('123'))).toBe(false);
    expect(isIntegerString(Number('123.1'))).toBe(false);
    expect(isIntegerString('awd')).toBe(false);
    expect(isIntegerString('10.1')).toBe(false);
    expect(isIntegerString('Infinity')).toBe(false);
    expect(isIntegerString('-Infinity')).toBe(false);
    expect(isIntegerString('NaN')).toBe(false);

    expect(isIntegerString('-1')).toBe(true);
    expect(isIntegerString('0')).toBe(true);
    expect(isIntegerString('10')).toBe(true);
  });
});
