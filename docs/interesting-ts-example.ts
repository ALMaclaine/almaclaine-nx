// type TableStackConfig<StackName extends string> = {
//   [K in `${StackName}_TABLE_STACK`]: `${Lowercase<StackName>}-dynamodb`;
// };
//
// type Test21<StackName extends string> = `${StackName}_USER_STACK`;
//
// type Test11<StackName extends string> = {
//   [K in `${StackName}_USER_STACK`]: `${Lowercase<StackName>}-user`;
// };
//
// type KeyTypes<StackName extends string> = {
//   table: TableStackConfig<StackName>;
//   user: Test11<StackName>;
// };
//
// type GenerateType<
//   StackName extends string,
//   Options extends (keyof KeyTypes<StackName>)[]
// > = UnionToIntersection<KeyTypes<StackName>[Options[number]]>;
//
// function test9<
//   StackName extends string,
//   Options extends Array<keyof KeyTypes<StackName>>
// >(stackName: StackName, options: Options): GenerateType<StackName, Options> {
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const result: any = {};
//
//   if (options.includes('table')) {
//     const key = `${stackName}_TABLE_STACK`;
//     result[key] = `${stackName.toLowerCase()}-dynamodb`;
//   }
//   if (options.includes('user')) {
//     const key = `${stackName}_USER_STACK`;
//     result[key] = `${stackName.toLowerCase()}-user`;
//   }
//
//   return result;
// }
//
// const t1 = test9(WB, ['table']); // only table key
// const asd1 = t1.WaliBot_TABLE_STACK;
//
// const t2 = test9(WB, ['user']); // only user key
// const asd2 = t2.WaliBot_USER_STACK;
//
// const t3 = test9(WB, ['table', 'user']); // both keys
// const asd3_1 = t3.WaliBot_TABLE_STACK;
// const asd3_2 = t3.WaliBot_USER_STACK;
