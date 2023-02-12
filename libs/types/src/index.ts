export type { ObjectValues } from './lib/object-values';
export type { Printable } from './lib/printable';
export type { Whitespace } from './lib/whitespace';
export type { Sized } from './lib/sized';
export type { Option } from './lib/option';

export {
  some,
  none,
  isSome,
  isNone,
  someOrElse,
  someOrError,
  ifTrueSome,
} from './lib/option';
