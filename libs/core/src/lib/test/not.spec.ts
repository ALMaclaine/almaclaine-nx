import { not } from '../not';

describe('lang/not()', () => {
  it('not works', () => {
    expect(not(true)).toBeFalsy();
    expect(not(false)).toBeTruthy();
  });
});
