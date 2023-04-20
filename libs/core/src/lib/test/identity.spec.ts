import { identity } from '../identity';

describe('function/identity()', function () {
  it('identity works', function () {
    expect(identity(1)).toBe(1);
    expect(identity('a')).toBe('a');
    const a = {};
    expect(identity(a)).toBe(a);
  });
});
