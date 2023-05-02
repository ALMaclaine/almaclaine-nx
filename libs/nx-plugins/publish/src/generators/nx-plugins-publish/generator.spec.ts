import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import type { Tree } from '@nx/devkit';
import { readProjectConfiguration } from '@nx/devkit';

import generator from './generator';
import type { NxPluginsPublishGeneratorSchema } from './schema';

describe('nx-plugins-publish generator', () => {
  let appTree: Tree;
  const options: NxPluginsPublishGeneratorSchema = { name: 'test' };

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await generator(appTree, options);

    const config = readProjectConfiguration(appTree, 'test');
    expect(config).toBeDefined();
  });
});
