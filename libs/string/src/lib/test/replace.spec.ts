import { replace } from '../replace';

describe('string/replace', function () {
  it('replace should work', function () {
    expect(replace('asd', 's', 'f')).toEqual('afd');
    expect(replace('asd', /s/, 'f')).toEqual('afd');
  });
});
