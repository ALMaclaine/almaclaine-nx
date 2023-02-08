import { isObject } from './is-object';
import { isArray } from './is-array';
import { Sized } from '@almaclaine/types';

const isSized = <T extends Sized>(val: unknown): val is T =>
  isArray(val) || (isObject(val) && 'length' in val);
export { isSized };
