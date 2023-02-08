import { isFalsy } from '../is-falsy';

describe('lang/isFalsy', () => {
  it('isFalsy works', () => {
    expect(isFalsy(null)).toBe(true);
    expect(isFalsy(void 0)).toBe(true);
    expect(isFalsy(undefined)).toBe(true);
    expect(isFalsy('')).toBe(true);
    expect(isFalsy(0)).toBe(true);
  });
});
