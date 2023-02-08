import { is } from './is';

const isnt = (x: unknown, y: unknown): boolean => !is(x, y);
export { isnt };
