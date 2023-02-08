import { isNumberString } from '../is-number-string';

describe('lang/isNumberString()', function () {
  it('should detect if value is a Number', function () {
    expect(isNumberString(0)).toBe(false);
    expect(isNumberString(123)).toBe(false);
    expect(isNumberString(Number(123))).toBe(false);
    expect(isNumberString('')).toBe(false);
    expect(isNumberString(false)).toBe(false);
    expect(isNumberString(null)).toBe(false);
    expect(isNumberString({})).toBe(false);
    expect(isNumberString(Number('123'))).toBe(false);
    expect(isNumberString(Number('123.1'))).toBe(false);
    expect(isNumberString('awd')).toBe(false);

    expect(isNumberString('0')).toBe(true);
    expect(isNumberString('10')).toBe(true);
    expect(isNumberString('10.1')).toBe(true);
    expect(isNumberString('-1')).toBe(true);
    expect(isNumberString('Infinity')).toBe(true);
    expect(isNumberString('-Infinity')).toBe(true);
    expect(isNumberString('NaN')).toBe(true);
  });
});
