const escapeRegex = (str: string) => str.replace(/\W/g, '\\$&');
export { escapeRegex };
