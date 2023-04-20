import { rtrim } from '../rtrim';

describe('string/rtrim()', function () {
  it('should remove whitespaces from end of string', function () {
    const str = '   \t \t \t\t     lorem  ipsum    \t \t  \t\t  ';
    expect(rtrim(str)).toEqual('   \t \t \t\t     lorem  ipsum');
  });

  it('should remove specified chars from end of string', function () {
    const str = '-+-*test*-+-';
    const chars = ['-', '+', '*'];
    expect(rtrim(str, (val: string) => chars.includes(val))).toEqual(
      '-+-*test'
    );
  });
});
