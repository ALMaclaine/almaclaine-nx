import type { Tree, ProjectType, ProjectConfiguration } from '@nx/devkit';
import { getProjects } from '@nx/devkit';
import type { Option } from '@almaclaine/option';
import {
  equalsValue,
  isNone,
  none,
  some,
  someOrElse,
} from '@almaclaine/option';

function hasProject(tree: Tree, name: string): boolean {
  return getProjects(tree).has(name);
}

function hasProjectOrFail(tree: Tree, name: string): void {
  if (!hasProject(tree, name)) {
    throw Error(`Project ${name} not found`);
  }
}

function getProjectSourceRoot(
  tree: Tree,
  name: string
): Option<string | undefined> {
  const res = getProjects(tree).get(name);
  if (!res) {
    return none();
  }

  return some(res.sourceRoot);
}

function getProjectType(
  tree: Tree,
  name: string
): Option<ProjectType | undefined> {
  const res = getProjects(tree).get(name);
  if (!res) {
    return none();
  }

  return some(res.projectType);
}

function isProjectType(tree: Tree, name: string, type: ProjectType): boolean {
  const res = getProjectType(tree, name);
  return equalsValue(res, type);
}

function isApplication(tree: Tree, name: string): boolean {
  return isProjectType(tree, name, 'application');
}

function isApplicationOrFail(tree: Tree, name: string): void {
  if (!isApplication(tree, name)) {
    throw Error(`Project ${name} is not an application`);
  }
}

function hasLibrary(tree: Tree, name: string): boolean {
  return hasProject(tree, name) && isLibrary(tree, name);
}

function hasApplication(tree: Tree, name: string): boolean {
  return hasProject(tree, name) && isApplication(tree, name);
}

function hasLibraryOrFail(tree: Tree, name: string): void {
  hasProjectOrFail(tree, name);
  if (!hasLibrary(tree, name)) {
    throw Error(`Project ${name} is not a library`);
  }
}

function hasApplicationOrFail(tree: Tree, name: string): void {
  hasProjectOrFail(tree, name);
  if (!hasApplication(tree, name)) {
    throw Error(`Project ${name} is not a application`);
  }
}

function isLibrary(tree: Tree, name: string): boolean {
  return isProjectType(tree, name, 'library');
}

function isLibraryOrFail(tree: Tree, name: string): void {
  if (!isLibrary(tree, name)) {
    throw Error(`Project ${name} is not a library`);
  }
}

function getProjectRoot(tree: Tree, name: string): Option<string | undefined> {
  const res = getProjects(tree).get(name);
  if (!res) {
    return none();
  }

  return some(res.root);
}

function getProjectTags(
  tree: Tree,
  name: string
): Option<string[] | undefined> {
  const res = getProjects(tree).get(name);
  if (!res) {
    return none();
  }

  return some(res.tags);
}

export {
  getProjectTags,
  getProjectRoot,
  getProjectType,
  getProjectSourceRoot,
  hasProject,
  hasProjectOrFail,
  isApplication,
  isLibrary,
  isProjectType,
  isApplicationOrFail,
  isLibraryOrFail,
  hasLibrary,
  hasApplication,
  hasLibraryOrFail,
  hasApplicationOrFail,
};
