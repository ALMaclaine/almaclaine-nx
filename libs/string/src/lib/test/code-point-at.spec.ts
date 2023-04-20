import { codePointAt } from '../code-point-at';

describe('string/codePointAt()', () => {
  it('at works', () => {
    expect(codePointAt('☃★♲', 1)).toEqual(9733);
  });
});
