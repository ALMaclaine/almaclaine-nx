import { properCase } from '../proper-case';

describe('string/properCase()', function () {
  it('should uppercase first char of each word and lowercase others', function () {
    expect(properCase('lorem iPSum dolor')).toEqual('Lorem Ipsum Dolor');
  });
});
