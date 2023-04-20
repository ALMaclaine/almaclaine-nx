import { equalsString } from '../equals-string';

describe('equals/equalsString()', function () {
  it('equalsString works', function () {
    expect(equalsString('asd', 'asd')).toBeTruthy();
    expect(equalsString('asd', 'fdsa')).toBeFalsy();
  });
});
