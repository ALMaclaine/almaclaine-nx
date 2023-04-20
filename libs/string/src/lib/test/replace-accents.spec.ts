import { replaceAccents } from '../replace-accents';

describe('string/replaceAccents()', function () {
  it('should replace all Basic Latin and Latin-1 accented chars with regular ones', function () {
    const accents = 'áÁâÂàÀåÅãÃäÄçÇéÉêÊèÈëËíÍîÎìÌïÏñÑóÓôÔòÒØõÕöÖÐþúÚûÛùÙüÜýÝÿ';
    const regular = 'aAaAaAaAaAaAcCeEeEeEeEiIiIiIiInNoOoOoOOoOoODpuUuUuUuUyYy';
    expect(replaceAccents(accents)).toEqual(regular);
  });
});
