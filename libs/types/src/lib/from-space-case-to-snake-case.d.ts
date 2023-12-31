type FromSpaceCaseToSnakeCase<S extends string> = S extends `${infer T} ${infer U}` ? `${T}_${FromSpaceCaseToSnakeCase<U>}` : S extends `${infer T}${infer U}` ? U extends Uncapitalize<U> ? `${T}${FromSpaceCaseToSnakeCase<U>}` : `${T}_${FromSpaceCaseToSnakeCase<Capitalize<U>>}` : Uppercase<S>;
export type { FromSpaceCaseToSnakeCase };
