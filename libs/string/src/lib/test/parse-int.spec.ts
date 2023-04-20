import { parseInt } from '../parse-int';

describe('string/parseInt()', function () {
  it('parseInt should work', function () {
    expect(parseInt('1')).toEqual(1);
    expect(parseInt('2')).toEqual(2);
    expect(parseInt('2.2')).toEqual(2);
  });
});
