import { isEven } from '../is-even';

describe('lang/isEven', () => {
  it('isEven works', () => {
    expect(isEven(-1)).toBe(false);
    expect(isEven(1)).toBe(false);
    expect(isEven(3)).toBe(false);
    expect(isEven(0)).toBe(true);
    expect(isEven(2)).toBe(true);
    expect(isEven(-2)).toBe(true);
  });
});
