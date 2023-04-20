import { lowerCase } from './lower-case';
import { upperCase } from './upper-case';

const sentenceCase = (str: string) => {
  return lowerCase(str).replace(/(^\w)|\.\s+(\w)/gm, upperCase);
};
export { sentenceCase };
