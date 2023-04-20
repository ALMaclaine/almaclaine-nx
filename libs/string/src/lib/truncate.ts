import { trim } from './trim';

interface TruncateOptions {
  append?: string;
  onlyFullWords?: boolean;
}

const truncate = (
  str: string,
  maxChars: number,
  options: TruncateOptions = {}
) => {
  const { append = '...', onlyFullWords = false } = options;

  let newStr = trim(str);
  if (newStr.length <= maxChars) {
    return newStr;
  }

  newStr = newStr.slice(0, maxChars - append.length);

  //crop at last space or remove trailing whitespace
  const spaceIndex = str.indexOf(' ', newStr.length);
  if (onlyFullWords && spaceIndex !== newStr.length) {
    const index = newStr.lastIndexOf(' ');
    newStr = newStr.slice(0, index);
  } else {
    newStr = trim(newStr);
  }

  return newStr + append;
};
export { truncate };
