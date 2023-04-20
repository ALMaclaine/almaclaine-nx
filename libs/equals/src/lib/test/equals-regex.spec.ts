import { equalsRegex } from '../equals-regex';

describe('equals/equalsDate()', function () {
  it('equalsDate works', function () {
    expect(equalsRegex(/awda/gm, /awda/gm)).toBeTruthy();
    expect(equalsRegex(/aww.+da/gm, /awda/gm)).toBeFalsy();
  });
});
