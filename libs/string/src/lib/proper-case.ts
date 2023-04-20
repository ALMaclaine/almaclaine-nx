import { lowerCase } from './lower-case';
import { upperCase } from './upper-case';

const properCase = (str: string) => {
  return lowerCase(str).replace(/^\w|\s\w/g, upperCase);
};
export { properCase };
