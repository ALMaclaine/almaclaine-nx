import { charAt } from '../char-at';

describe('string/at()', function () {
  it('at works', function () {
    expect(charAt('123', 2)).toEqual('3');
    expect(charAt('123', -1)).toEqual('');
    expect(charAt('123', 3)).toEqual('');
  });
});
