function prefix(prefix: string, suffix: string): string {
  return `${prefix}${suffix}`;
}

function generateName(pre: string) {
  return prefix(pre, 'Name');
}

function generateArn(pre: string) {
  return prefix(pre, 'Arn');
}

function generateUrl(pre: string) {
  return prefix(pre, 'Url');
}

export { generateArn, generateName, generateUrl, prefix };
