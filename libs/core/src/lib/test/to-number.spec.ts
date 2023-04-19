import { toNumber } from '../to-number';

describe('lang/toNumber', () => {
  it('should convert null to zero', () => {
    expect(toNumber(null)).toBe(0);
  });

  it('should convert undefined to zero', () => {
    // this goes against the [ToNumber](http://es5.github.io/#x9.3)
    // but it will avoid potential headaches for end users
    expect(toNumber(void 0)).toBe(0);
  });

  it('should handle empty string as zero', () => {
    expect(toNumber('')).toBe(0);
  });

  it('should return numeric value unchanged', () => {
    expect(toNumber(0)).toBe(0);
    expect(toNumber(123)).toBe(123);
    expect(toNumber(-123)).toBe(-123);
    expect(toNumber(0.45)).toBe(0.45);
    expect(toNumber(-0.45)).toBe(-0.45);
    expect(toNumber(Infinity)).toEqual(Infinity);
  });

  it('should keep negative zero sign', () => {
    expect(1 / toNumber(-0)).toEqual(-Infinity);
    expect(1 / toNumber(+0)).toEqual(Infinity);
  });

  it('should typecast boolean into number', () => {
    expect(toNumber(false)).toBe(0);
    expect(toNumber(true)).toBe(1);
  });

  it('should typecast numeric string into number', () => {
    expect(toNumber('123')).toBe(123);
    expect(toNumber('123.45')).toBe(123.45);
  });

  it('should convert Date to ms integer', () => {
    // use timestamp to make test deterministic (avoid timezone issues)
    expect(toNumber(new Date(490935600000))).toBe(490935600000);
  });

  it('should handle String constructor', () => {
    expect(toNumber(String('78'))).toBe(78);
  });

  it('should handle Number constructor', () => {
    expect(toNumber(Number(90))).toBe(90);
  });

  it('should return NaN if not numeric', () => {
    expect(toNumber('false')).toBeNaN();
    expect(toNumber('true')).toBeNaN();
    expect(toNumber({})).toBeNaN();
    expect(toNumber(/123/)).toBeNaN();
    expect(toNumber([])).toBeNaN();
    expect(toNumber([1])).toBeNaN();
  });
});
