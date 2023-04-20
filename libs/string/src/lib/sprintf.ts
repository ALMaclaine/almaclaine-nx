const sprintf = (str: string, args: string[]): string => {
  const _sprintf = (built: string, it = 0): string => {
    if (/%s/.test(built) && args[it]) {
      const tmpArg = args[it];
      const finalArg =
        typeof tmpArg === 'object' ? JSON.stringify(tmpArg) : tmpArg;
      return _sprintf(built.replace('%s', finalArg), it + 1);
    } else {
      return built;
    }
  };
  return _sprintf(str);
};
export { sprintf };
