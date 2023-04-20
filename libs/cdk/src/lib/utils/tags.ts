import type { Construct } from 'constructs';
import type { TagManager } from 'aws-cdk-lib';
import { Stack } from 'aws-cdk-lib';
import type { Option } from '@almaclaine/option';
import { none, some } from '@almaclaine/option';

class Tags extends Map<string, string> {
  constructor(struct: Construct) {
    super();

    const stack = Stack.of(struct);
    const tags = stack.tags.renderTags() as TagManager;
    this.fromTagManager(tags);
  }

  private static setToMap(tags: TagManager, map: Map<string, string>) {
    for (const obj of Object.values(tags)) {
      const { Key, Value } = obj as { Key: string; Value: string };
      map.set(Key, Value);
    }
  }

  fromTagManager(tags: TagManager): Tags {
    for (const obj of Object.values(tags)) {
      const { Key, Value } = obj as { Key: string; Value: string };
      this.set(Key, Value);
    }
    Tags.setToMap(tags, this);
    return this;
  }

  getOrError(key: string): string {
    const value = this.get(key);
    if (!value) {
      throw new Error(`Tag ${key} does not exist`);
    }

    return value;
  }

  static getMap(tags: TagManager): Map<string, string> {
    const map = new Map<string, string>();
    Tags.setToMap(tags, map);
    return map;
  }

  static staticGetProp(tags: TagManager, key: string): Option<string> {
    const map = Tags.getMap(tags);
    const res = map.get(key);
    if (res) {
      return some(res);
    } else {
      return none();
    }
  }
}

export { Tags };
