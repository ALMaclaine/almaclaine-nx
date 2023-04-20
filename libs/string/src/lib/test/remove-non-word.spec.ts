import { removeNonAscii } from '../remove-non-ascii';

describe('string/removeNonAscii()', function () {
  it('should remove non-printable chars', function () {
    const accents = 'áÁâÂàÀåÅãÃäÄçÇéÉêÊèÈëËíÍîÎìÌïÏñÑóÓôÔòÒØõÕöÖÐþúÚûÛùÙüÜýÝÿ';
    const printable = 'lorem ~!@#$%^&*()_+`-={}[]|\\:";\'/?><., ipsum';
    const str = accents + printable;

    expect(removeNonAscii(str)).toEqual(printable);
  });
});
