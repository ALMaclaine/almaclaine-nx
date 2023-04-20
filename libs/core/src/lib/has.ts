import { UNDEFINED } from '@almaclaine/constants';
import { get } from './get';

const has = (obj: Record<string, unknown>, prop: string) =>
  get(obj, prop) !== UNDEFINED;
export { has };
