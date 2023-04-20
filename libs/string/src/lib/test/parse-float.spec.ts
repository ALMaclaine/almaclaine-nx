import { parseFloat } from '../parse-float';

describe('string/parseFloat()', function () {
  it('parseFloat', function () {
    expect(parseFloat('1')).toEqual(1);
    expect(parseFloat('2')).toEqual(2);
    expect(parseFloat('2.2')).toEqual(2.2);
  });
});
