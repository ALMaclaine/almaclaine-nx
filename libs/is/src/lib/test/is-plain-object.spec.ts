import { isPlainObject } from '../is-plain-object';

describe('lang/isPlainObject', function () {
  it('should return true when plain object', function () {
    expect(isPlainObject({})).toBe(true);
    expect(isPlainObject({ test: true })).toBe(true);
    expect(isPlainObject({})).toBe(true);
  });

  it('should return false when not an object', function () {
    expect(isPlainObject(true)).toBe(false);
    expect(isPlainObject(null)).toBe(false);
    expect(isPlainObject(/test/)).toBe(false);
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    expect(isPlainObject(function () {})).toBe(false);
    expect(isPlainObject(1)).toBe(false);
    expect(isPlainObject([1])).toBe(false);
    expect(isPlainObject(Number(1))).toBe(false);
  });
});
