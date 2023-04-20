import { trim } from '../trim';

describe('string/trim()', function () {
  it('should remove whitespaces from begin and end of string', function () {
    const str = '   \t \t \t\t     lorem  ipsum    \t \t  \t\t  ';
    expect(trim(str)).toEqual('lorem  ipsum');
  });

  it('should remove specified chars from begin and end of string', function () {
    const str = '-+-*test*-+-';
    const chars = ['-', '+', '*'];
    expect(trim(str, (val: string) => chars.includes(val))).toEqual('test');
  });
});
