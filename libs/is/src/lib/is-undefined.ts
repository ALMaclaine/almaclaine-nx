import { UNDEFINED } from '@almaclaine/constants';

const isUndefined = (val: unknown): val is undefined => val === UNDEFINED;
export { isUndefined };
