import { equalsDate } from '../equals-date';

describe('equals/equalsDate()', function () {
  it('equalsDate works', function () {
    const dt1 = new Date(2011, 7, 30, 0, 0, 0, 0);
    const dt2 = new Date(2011, 7, 30, 0, 0, 0, 0);
    const dt3 = new Date(2011, 7, 30, 1, 0, 0, 0);
    expect(equalsDate(dt1, dt2)).toBeTruthy();
    expect(equalsDate(dt1, dt3)).toBeFalsy();
  });
});
