import { replaceAccents } from './replace-accents';
import { removeNonWord } from './remove-non-word';
import { trim } from './trim';

const slugify = (str: string, delimiter = '-') => {
  return trim(removeNonWord(replaceAccents(str)))
    .replace(/ +/g, delimiter) //replace spaces with delimiter
    .toLowerCase();
};
export { slugify };
