import type { Tree } from '@nx/devkit';
import { getWorkspaceLayout } from '@nx/devkit';

function getTreeRoot(tree: Tree): string {
  return tree.root;
}

function getAppsDir(tree: Tree): string {
  return getWorkspaceLayout(tree).appsDir;
}

function getLibsDir(tree: Tree): string {
  return getWorkspaceLayout(tree).libsDir;
}

function getNpmScope(tree: Tree): string {
  return getWorkspaceLayout(tree).npmScope;
}

function isStandAloneDefault(tree: Tree): boolean {
  return getWorkspaceLayout(tree).standaloneAsDefault;
}

export {
  getTreeRoot,
  getAppsDir,
  getLibsDir,
  getNpmScope,
  isStandAloneDefault,
};
