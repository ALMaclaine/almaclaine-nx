const prop = (name: string) => {
  return <T>(obj: Record<string, unknown>): T => {
    return obj[name] as T;
  };
};
export { prop };
