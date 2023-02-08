import { isKind } from './is-kind';

const isString = (val: unknown): val is string => isKind(val, 'String');
export { isString };
