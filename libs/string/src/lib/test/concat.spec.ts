import { concat } from '../concat';

describe('string/at()', function () {
  it('at works', function () {
    expect(concat('123', '123')).toEqual('123123');
    expect(concat('123', '123', 'a')).toEqual('123123a');
    expect(concat('123', '123', 'a', 'b')).toEqual('123123ab');
  });
});
