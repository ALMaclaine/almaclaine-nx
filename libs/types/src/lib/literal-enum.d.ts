type LiteralEnum<T extends string | number | symbol> = {
    [K in T]: K;
};
export type { LiteralEnum };
