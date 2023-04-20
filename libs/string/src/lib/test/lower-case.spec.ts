import { lowerCase } from '../lower-case';

describe('string/lowerCase()', function () {
  it('should convert string to lower case', function () {
    expect(lowerCase('FOO')).toEqual('foo');
    expect(lowerCase('Bar')).toEqual('bar');
    expect(lowerCase('ipsum')).toEqual('ipsum');
  });
});
