import { charCodeAt } from '../char-code-at';

describe('string/charCodeAt()', function () {
  it('at works', function () {
    expect(charCodeAt('123', 2)).toEqual(51);
    expect(charCodeAt('123', 0)).toEqual(49);
    expect(charCodeAt('123', 1)).toEqual(50);
    expect(charCodeAt('123', -1)).toEqual(-1);
    expect(charCodeAt('123', 3)).toEqual(-1);
  });
});
