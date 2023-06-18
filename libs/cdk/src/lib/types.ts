type ConstructDefaultTypes<StackName extends string> = {
  prod: boolean;
  stackName: StackName;
};

type DashJoined<
  T extends string = string,
  U extends string = string
> = `${T}-${U}`;

type JoinedString<T extends string, U extends string> = `${T}${U}`;

type ConstructNameLiteral<
  StackName extends string,
  ConstructName extends string,
  ConstructType extends string
> = Lowercase<DashJoined<StackName, DashJoined<ConstructType, ConstructName>>>;

export type {
  ConstructDefaultTypes,
  DashJoined,
  JoinedString,
  ConstructNameLiteral,
};
