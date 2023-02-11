type Line = string;
type RecordOrValue = Record<string, string | { [K in string]: RecordOrValue }>;

export type { Line, RecordOrValue };
