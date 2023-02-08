import { isKind } from './is-kind';

const isArray = <T>(val: unknown): val is T[] => isKind(val, 'Array');
export { isArray };
