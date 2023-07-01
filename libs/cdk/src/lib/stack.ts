import type { App, StackProps } from 'aws-cdk-lib';
import { getStackNameFromProps } from './utils/get-stack-names';
import { Stack as _Stack } from 'aws-cdk-lib';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
class Stack {
  private readonly _stack: _Stack;
  private readonly _stackName: string;
  get stack() {
    return this._stack;
  }
  get name() {
    return this._stackName;
  }
  constructor(scope: App, id: string, props: StackProps) {
    const stackName = Stack.getStackNameFromProps(id, props);
    this._stack = new _Stack(scope, stackName, props);
    this._stackName = stackName;
  }
  static getStackNameFromProps = getStackNameFromProps;
  static of<StackName extends string>(
    scope: App,
    id: StackName,
    props: StackProps
  ) {
    return new Stack(scope, id, props);
  }
}

export { Stack };
