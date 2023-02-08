import { isPrimitive } from '../is-primitive';

describe('lang/isPrimitive', function () {
  it('should return true when primitive value', function () {
    expect(isPrimitive(null)).toBe(true);
    expect(isPrimitive(undefined)).toBe(true);
    expect(isPrimitive(1)).toBe(true);
    expect(isPrimitive('foo')).toBe(true);
    expect(isPrimitive(true)).toBe(true);
    expect(isPrimitive(false)).toBe(true);
    expect(isPrimitive(NaN)).toBe(true);
    expect(isPrimitive(Infinity)).toBe(true);
    expect(isPrimitive(Number())).toBe(true);
    expect(isPrimitive(String())).toBe(true);
    expect(isPrimitive(Boolean())).toBe(true);
  });

  it('should return false when not primitive value', function () {
    expect(isPrimitive({})).toBe(false);
    expect(isPrimitive([])).toBe(false);
    expect(isPrimitive(/./)).toBe(false);
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    expect(isPrimitive(function () {})).toBe(false);
    expect(isPrimitive(new Date())).toBe(false);
    expect(isPrimitive(new Error())).toBe(false);
  });
});
