import { NULL } from '@almaclaine/constants';

const isNull = (val: unknown): val is null => val === NULL;
export { isNull };
