type ExecReturn = unknown | boolean;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ExecRecord = Record<string, any>;
type ExecFunction = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  val: any,
  key: string,
  obj: ExecRecord
  // returns or boolean so any function is accepted
) => ExecReturn;
export { ExecFunction, ExecReturn, ExecRecord };
