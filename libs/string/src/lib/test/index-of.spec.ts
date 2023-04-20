import { indexOf } from '../index-of';

describe('string/indexOf()', function () {
  it('indexOf works', function () {
    expect(indexOf('123', '1')).toEqual(0);
    expect(indexOf('123', '1')).toEqual(0);
    expect(indexOf('12123', 'a')).toEqual(-1);
  });
});
