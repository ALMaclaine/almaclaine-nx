type ConstructDefaultTypes<StackName extends string> = {
  prod: boolean;
  stackName: StackName;
};

type DashJoined<
  T extends string = string,
  U extends string = string
> = `${T}-${U}`;

type JoinedString<T extends string, U extends string> = `${T}${U}`;

export type { ConstructDefaultTypes, DashJoined, JoinedString };
