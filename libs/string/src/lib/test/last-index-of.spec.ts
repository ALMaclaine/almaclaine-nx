import { lastIndexOf } from '../last-index-of';

describe('string/lastIndexOf()', function () {
  it('lastIndexOf works', function () {
    expect(lastIndexOf('3123', '3')).toEqual(3);
    expect(lastIndexOf('123', '1')).toEqual(0);
    expect(lastIndexOf('12123', 'a')).toEqual(-1);
  });
});
