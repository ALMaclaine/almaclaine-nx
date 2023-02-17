import type { ExecutorContext } from '@nrwl/devkit';
import { logger, readJsonFile, runExecutor, writeJsonFile } from '@nrwl/devkit';
import * as semver from 'semver';

export default async function publishExecutor(
  options: unknown,
  context: ExecutorContext
): Promise<{ success: boolean }> {
  logger.debug('Start publishExecutor');
  const version = process.env['V'].replace('v', '');
  if (!semver.valid(version)) {
    throw new Error('Must set V env variable to valid version');
  }

  const mfa = process.env['MFA'];
  if (!mfa) {
    throw new Error('Must set MFA env variable to MFA key');
  }

  const node = context.projectGraph.nodes[context.projectName];
  const libPath = node.data.root;

  const srcPackagePath = `${context.root}/${libPath}/package.json`;
  const srcPackageJson = readJsonFile<Record<string, string>>(srcPackagePath);
  const currentVersion = srcPackageJson.version;
  if (semver.lte(version, currentVersion)) {
    throw new Error(
      `Provided version is less than or equal to current version: ${currentVersion}`
    );
  }
  srcPackageJson.version = version;
  logger.info('Writing new version to package.json');
  writeJsonFile(srcPackagePath, srcPackageJson);

  const buildPackagePath = `${context.root}/dist/${libPath}/package.json`;
  const buildPackageJson =
    readJsonFile<Record<string, string | Record<string, string>>>(
      buildPackagePath
    );

  delete buildPackageJson['exports']['.'];
  writeJsonFile(buildPackagePath, buildPackageJson);

  for await (const s of await runExecutor(
    { project: context.projectName, target: 'publish:upload' },
    { ver: version, tag: 'next', mfa },
    context
  )) {
    logger.info(s);
  }
  logger.debug('End publishExecutor');
  return { success: true };
}
