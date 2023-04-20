import { equalsNumber } from '../equals-number';

describe('equals/equalsNumber()', function () {
  it('equalsNumber works', function () {
    expect(equalsNumber(1, 1)).toBeTruthy();
    expect(equalsNumber(0, -0)).toBeTruthy();
    expect(equalsNumber(1, 2)).toBeFalsy();
  });
});
