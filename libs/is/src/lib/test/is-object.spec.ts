import { isObject } from '../is-object';

describe('lang/isObject()', function () {
  it('should detect if value is an object', function () {
    expect(isObject({})).toBe(true);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    expect(isObject(new (function () {})())).toBe(true);

    expect(isObject('')).toBe(false);
    expect(isObject(123)).toBe(false);
    expect(isObject(null)).toBe(false);
    expect(isObject([])).toBe(false);
  });
});
