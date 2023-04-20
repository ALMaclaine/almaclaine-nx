import { ltrim } from '../ltrim';

describe('string/ltrim()', function () {
  it('should remove whitespaces from begin of string', function () {
    const str = '   \t \t \t\t     lorem  ipsum    \t \t  \t\t  ';
    expect(ltrim(str)).toEqual('lorem  ipsum    \t \t  \t\t  ');
  });

  it('should remove specified chars from begin of string', function () {
    const str = '-+-*test*-+-';
    const chars = ['-', '+', '*'];
    expect(ltrim(str, (val) => chars.includes(val))).toEqual('test*-+-');
  });
});
