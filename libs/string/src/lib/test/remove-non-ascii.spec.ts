import { removeNonWord } from '../remove-non-word';

describe('string/removeNonWord()', function () {
  it('should remove non word chars', function () {
    const str = 'lorem ~!@#$%^&*()_+`-={}[]|\\:";\'/?><., ipsum\xD7';
    expect(removeNonWord(str)).toEqual('lorem _- ipsum');
  });
});
