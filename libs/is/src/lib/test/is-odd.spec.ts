import { isOdd } from '../is-odd';

describe('lang/isOdd', () => {
  it('isOdd works', () => {
    expect(isOdd(-1)).toBe(true);
    expect(isOdd(1)).toBe(true);
    expect(isOdd(3)).toBe(true);
    expect(isOdd(0)).toBe(false);
    expect(isOdd(2)).toBe(false);
    expect(isOdd(-2)).toBe(false);
  });
});
