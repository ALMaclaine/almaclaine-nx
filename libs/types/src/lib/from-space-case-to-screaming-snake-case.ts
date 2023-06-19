import type { FromSpaceCaseToSnakeCase } from './from-space-case-to-snake-case';

type FromSpaceCaseToScreamingSnakeCase<S extends string> = Uppercase<
  FromSpaceCaseToSnakeCase<S>
>;

export type { FromSpaceCaseToScreamingSnakeCase };
