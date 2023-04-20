import { substring } from '../substring';

describe('string/subString', () => {
  it('should strip leading characters up to | from a string', () => {
    expect(substring('Mozilla', 1, 3)).toEqual('oz');
    expect(substring('Mozilla', 2)).toEqual('zilla');
  });
});
