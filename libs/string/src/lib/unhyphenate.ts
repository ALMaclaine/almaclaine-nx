const unhyphenate = (str: string) => str.replace(/(\w)(-)(\w)/g, '$1 $3');
export { unhyphenate };
