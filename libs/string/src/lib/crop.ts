import { truncate } from './truncate';

const crop = (str: string, maxChars: number, append?: string) =>
  truncate(str, maxChars, { append, onlyFullWords: true });
export { crop };
