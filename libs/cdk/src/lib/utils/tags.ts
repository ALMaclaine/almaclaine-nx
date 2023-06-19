import type { Construct } from 'constructs';
import type { TagManager } from 'aws-cdk-lib';
import { Stack } from 'aws-cdk-lib';
import type { Stages } from '../constants';
import { StagesEnum } from '../constants';
import { StageSchema, TAG_STAGE } from '../constants';

class TagsMap extends Map<string, string> {
  static fromTagsManager(tagManager: TagManager): TagsMap {
    const map = new TagsMap();
    for (const obj of Object.values(tagManager)) {
      const { Key, Value } = obj as { Key: string; Value: string };
      map.set(Key, Value);
    }
    return map;
  }

  static addTagsToMap(tags: TagManager, map: TagsMap): TagsMap {
    for (const obj of Object.values(tags)) {
      const { Key, Value } = obj as { Key: string; Value: string };
      map.set(Key, Value);
    }
    return map;
  }
}

class Tags {
  private tags = new TagsMap();
  private static getTagManager(scope: Construct): TagManager {
    const stack = Stack.of(scope);
    return stack.tags.renderTags() as TagManager;
  }
  constructor(scope: Construct) {
    const tagsManager = Tags.getTagManager(scope);
    this.tags = TagsMap.fromTagsManager(tagsManager);
  }

  static addTagsToMap(tags: TagManager, map: TagsMap): TagsMap {
    return TagsMap.addTagsToMap(tags, map);
  }

  static fromTagsToMap(tags: TagManager): TagsMap {
    return TagsMap.fromTagsManager(tags);
  }

  isProd() {
    return this.getStage() === StagesEnum.PROD;
  }

  static fromScopeToMap(scope: Construct): Map<string, string> {
    const tags = Tags.getTagManager(scope);
    return Tags.fromTagsToMap(tags);
  }

  static isProd(scope: Construct) {
    return Tags.getStage(scope) === StagesEnum.PROD;
  }

  isDeve() {
    return this.getStage() === StagesEnum.DEVE;
  }

  static isDeve(scope: Construct) {
    return Tags.getStage(scope) === StagesEnum.DEVE;
  }

  isTest() {
    return this.getStage() === StagesEnum.TEST;
  }

  static isTest(scope: Construct) {
    return Tags.getStage(scope) === StagesEnum.TEST;
  }

  getOrError(key: string): string {
    const value = this.tags.get(key);
    if (!value) {
      throw new Error(`Tag ${key} does not exist`);
    }

    return value;
  }

  static getStageFromMap(map: TagsMap): Stages {
    const value = map.get(TAG_STAGE);
    return StageSchema.parse(value);
  }

  static getStage(scope: Construct): Stages {
    const map = Tags.fromScopeToMap(scope);
    return Tags.getStageFromMap(map);
  }

  getStage(): Stages {
    return Tags.getStageFromMap(this.tags);
  }

  static getMapFromManager(tags: TagManager): TagsMap {
    const map = new TagsMap();
    return Tags.addTagsToMap(tags, map);
  }
}

export { Tags };
