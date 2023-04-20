import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import type { Tree} from '@nrwl/devkit';
import { readProjectConfiguration } from '@nrwl/devkit';

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
