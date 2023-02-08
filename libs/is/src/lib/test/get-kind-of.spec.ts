import { getKindOf } from '../get-kind-of';

describe('lang/getKindOf()', function () {
  it('should get the kind of value', function () {
    expect(getKindOf('')).toEqual('String');
    expect(getKindOf('foo')).toEqual('String');
    expect(getKindOf(String('lorem'))).toEqual('String');
    expect(getKindOf(String(123))).toEqual('String');

    expect(getKindOf(0)).toEqual('Number');
    expect(getKindOf(123)).toEqual('Number');
    expect(getKindOf(Number(123))).toEqual('Number');
    expect(getKindOf(Number('123'))).toEqual('Number');

    expect(getKindOf(true)).toEqual('Boolean');
    expect(getKindOf(false)).toEqual('Boolean');
    expect(getKindOf(Boolean(false))).toEqual('Boolean');
    expect(getKindOf(Boolean(true))).toEqual('Boolean');
    expect(getKindOf(Boolean(0))).toEqual('Boolean');
    expect(getKindOf(Boolean(1))).toEqual('Boolean');

    expect(getKindOf([1, 'foo'])).toEqual('Array');
    expect(getKindOf(new Array(3))).toEqual('Array');

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    expect(getKindOf(function () {})).toEqual('Function');

    expect(getKindOf(/\w+/)).toEqual('RegExp');
    expect(getKindOf(new RegExp('\\w+', 'g'))).toEqual('RegExp');

    expect(getKindOf(new Date())).toEqual('Date');

    expect(getKindOf(null)).toEqual('Null');

    expect(getKindOf(undefined)).toEqual('Undefined');
  });
});
