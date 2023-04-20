import { ltrim } from './ltrim';
import { rtrim } from './rtrim';
import type { Predicate } from '@almaclaine/types';

const trim = (val: string, predicate?: Predicate<string>) =>
  ltrim(rtrim(val, predicate), predicate);
export { trim };
