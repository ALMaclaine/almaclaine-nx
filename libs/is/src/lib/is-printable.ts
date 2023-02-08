import { isKind } from './is-kind';
import { Printable } from '@almaclaine/types';

const isPrintable = (val: unknown): val is Printable =>
  !isKind(val?.toString, 'Undefined');
export { isPrintable };
