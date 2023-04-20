const unescapeUnicode = (str: string) => {
  return str.replace(/\\u[0-9a-f]{4}/g, function (ch) {
    const code = parseInt(ch.slice(2), 16);
    return String.fromCharCode(code);
  });
};
export { unescapeUnicode };
