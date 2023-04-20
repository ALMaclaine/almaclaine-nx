import { lpad } from '../lpad';

describe('string/lpad()', function () {
  it('should add chars to the right if length is < minLength', function () {
    expect(lpad('ab', 0, '-')).toEqual('ab');
    expect(lpad('ab', 1, '-')).toEqual('ab');
    expect(lpad('ab', 2, '-')).toEqual('ab');
    expect(lpad('ab', 3, '-')).toEqual('-ab');
    expect(lpad('ab', 4, '-')).toEqual('--ab');
  });
});
