import type { Sized } from '@almaclaine/types';
declare const isSized: <T extends Sized>(val: unknown) => val is T;
export { isSized };
