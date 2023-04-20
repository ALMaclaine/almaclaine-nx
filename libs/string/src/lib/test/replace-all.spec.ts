import { replaceAll } from '../replace-all';

describe('string/replace', function () {
  it('replace should work', function () {
    expect(replaceAll('assd', 's', 'f')).toEqual('affd');
    expect(replaceAll('assd', /s/g, 'f')).toEqual('affd');
  });
});
