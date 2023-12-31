type ExecReturn = unknown | boolean;
type ExecRecord = Record<string, any>;
type ExecFunction = (val: any, key: string, obj: ExecRecord) => ExecReturn;
export type { ExecFunction, ExecReturn, ExecRecord };
