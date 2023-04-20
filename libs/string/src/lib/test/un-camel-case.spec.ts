import { unCamelCase } from '../un-camel-case';

describe('string/unCamelCase()', function () {
  it('should add space between camelCase text', function () {
    expect(unCamelCase('loremIpsumDolor')).toEqual('lorem ipsum dolor');
    expect(unCamelCase('lorem IpsumDolor')).toEqual('lorem ipsum dolor');
  });

  it('should use specified separator', function () {
    expect(unCamelCase('loremIpsumDolor', '-')).toEqual('lorem-ipsum-dolor');
  });
});
