import { slugify } from './slugify';
import { unCamelCase } from './un-camel-case';

const hyphenate = (str: string) => slugify(unCamelCase(str), '-');

export { hyphenate };
