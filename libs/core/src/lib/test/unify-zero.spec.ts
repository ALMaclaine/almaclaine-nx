import { unifyZero } from '../unify-zero';

describe('math/unifyZero', function () {
  it('unifyZero should work', function () {
    expect(unifyZero(2.6)).toBe(2.6);
    expect(unifyZero(0)).toBe(0);
    expect(unifyZero(-0)).toBe(0);
  });
});
