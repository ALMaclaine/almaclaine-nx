type MethodReturnType<T> = T extends (...args: unknown[]) => infer R ? R : never;
export type { MethodReturnType };
