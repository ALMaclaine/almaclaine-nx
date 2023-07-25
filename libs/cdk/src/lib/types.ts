type ConstructDefaultTypes<StackName extends string> = {
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

type UnderscoreJoin<
  Left extends string,
  Right extends string
> = `${Left}_${Right}`;

export type {
  ConstructDefaultTypes,
  ConstructNameLiteral,
  DashJoined,
  JoinedString,
  UnderscoreJoin,
};
