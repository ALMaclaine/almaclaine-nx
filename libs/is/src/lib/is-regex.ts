import { isKind } from './is-kind';

const isRegex = (val: unknown): val is RegExp => isKind(val, 'RegExp');
export { isRegex };
