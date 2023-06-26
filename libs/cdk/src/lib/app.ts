import { App as _App } from 'aws-cdk-lib';

class App {
  static of() {
    return new _App();
  }
}

export { App };
