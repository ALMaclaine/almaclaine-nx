import { isFloat } from '../is-float';

describe('lang/isFloat', function () {
  it("should return false if value isn't a float", function () {
    expect(isFloat(false)).toBe(false);
    expect(isFloat(true)).toBe(false);
    expect(isFloat('foo')).toBe(false);
    expect(isFloat('123')).toBe(false);
    expect(isFloat('123.45')).toBe(false);
    expect(isFloat(Date())).toBe(false);
    expect(isFloat(/foo/)).toBe(false);
    expect(isFloat({})).toBe(false);
    expect(
      isFloat({
        valueOf: function () {
          return 123;
        },
      })
    ).toBe(false);
    expect(isFloat(Infinity)).toBe(false);
    expect(isFloat(-Infinity)).toBe(false);
    expect(isFloat(0)).toBe(false);
    expect(isFloat(1)).toBe(false);
    expect(isFloat(123)).toBe(false);
    expect(isFloat(-123)).toBe(false);
    expect(isFloat(Number(-123))).toBe(false);
  });

  it('should return true if value is a float', function () {
    expect(isFloat(1.1)).toBe(true);
    expect(isFloat(123.2)).toBe(true);
    expect(isFloat(-123.3)).toBe(true);
    expect(isFloat(Number(-123.5))).toBe(true);
    expect(isFloat(123.45)).toBe(true);
    expect(isFloat(-0.45)).toBe(true);
    expect(isFloat(Number(-0.45))).toBe(true);
  });

  it('should work even with large numbers', function () {
    expect(isFloat(Math.pow(2, 45) + 0.05)).toEqual(true);
    expect(isFloat(Math.pow(2, 45) - 0.05)).toEqual(true);
    expect(isFloat(Math.pow(2, 45))).toEqual(false);
    expect(isFloat(-Math.pow(2, 45))).toEqual(false);
  });
});
