import { isKind } from './is-kind';

const isNumber = (val: unknown): val is number => isKind(val, 'Number');
export { isNumber };
