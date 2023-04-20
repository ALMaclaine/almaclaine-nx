const normalizeLineBreaks = (str: string, lineEnd = '\n') => {
  return str
    .replace(/\r\n/g, lineEnd) // DOS
    .replace(/\r/g, lineEnd) // Mac
    .replace(/\n/g, lineEnd); // Unix
};
export { normalizeLineBreaks };
