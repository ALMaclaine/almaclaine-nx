import { isKind } from './is-kind';
import type { Printable } from '@almaclaine/types';

const isPrintable = (val: unknown): val is Printable =>
  !isKind(val?.toString, 'Undefined'); // eslint-disable-line @typescript-eslint/unbound-method
export { isPrintable };
