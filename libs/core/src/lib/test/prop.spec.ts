import { prop } from '../prop';

describe('function/prop()', function () {
  it('should grab property from object', function () {
    const o = { foo: 'bar', d: new Date() };
    const getFoo = prop('foo');
    expect(getFoo<string>(o)).toBe('bar');
  });
});
