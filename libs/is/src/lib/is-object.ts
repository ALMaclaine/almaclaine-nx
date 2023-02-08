import { isKind } from './is-kind';

const isObject = (val: unknown): val is object => isKind(val, 'Object');
export { isObject };
