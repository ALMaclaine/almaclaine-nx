import { at } from '../at';

describe('string/at()', function () {
  it('at works', function () {
    expect(at('123', 2)).toEqual('3');
    expect(at('123', 3)).toEqual('');
  });
});
