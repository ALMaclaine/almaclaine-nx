const stripHtmlTags = (str: string) => {
  return str.replace(/<[^>]*>/g, '');
};
export { stripHtmlTags };
