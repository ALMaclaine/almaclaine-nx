export {
  getTreeRoot,
  getAppsDir,
  getLibsDir,
  getNpmScope,
  isStandAloneDefault,
} from './lib/tree-utils';

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
} from './lib/project-utils';

export {
  getInstallCmd,
  getCiInstallCmd,
  getAddCmd,
  getAddDevCmd,
  getRmCmd,
  getExecCmd,
  getRunCmd,
  getListCmd,
} from './lib/package-manager-utils';
