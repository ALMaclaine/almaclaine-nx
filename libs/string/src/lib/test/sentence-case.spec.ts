import { sentenceCase } from '../sentence-case';

describe('string/sentenceCase()', function () {
  it('should uppercase first char of each sentence and lowercase others', function () {
    const str = 'lorem Ipsum doLOr. sit amet dolor.';
    expect(sentenceCase(str)).toEqual('Lorem ipsum dolor. Sit amet dolor.');
  });
});
