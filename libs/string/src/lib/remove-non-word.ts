const PATTERN = /[^\x20\x2D0-9A-Z\x5Fa-z\xC0-\xD6\xD8-\xF6\xF8-\xFF]/g;

// pattern created with
// const regenerate = require('regenerate');
//
// const pattern = regenerate()
//   .addRange('a', 'z')
//   .addRange('A', 'Z')
//   .addRange('0', '9')
//   .addRange(0xC0, 0xFF)
//   .add(' ', '-', '_')
//   .remove(0xF7, 0xD7)
//   .toString();

/**
 * Remove non-word chars.
 */
const removeNonWord = (str: string) => {
  return str.replace(PATTERN, '');
};
export { removeNonWord };
