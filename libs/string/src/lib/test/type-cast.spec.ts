import { typeCast } from '../type-cast';

describe('string/typecast()', function () {
  it('should typecast values if Number, Boolean, null or undefined', function () {
    expect(typeCast('true')).toBe(true);
    expect(typeCast('false')).toBe(false);
    expect(typeCast('123')).toBe(123);
    expect(typeCast('123.45')).toBe(123.45);
    expect(typeCast('null')).toBe(null);
    expect(typeCast('undefined')).toBe(undefined);
    expect(typeCast('foo')).toBe('foo');
  });
});
