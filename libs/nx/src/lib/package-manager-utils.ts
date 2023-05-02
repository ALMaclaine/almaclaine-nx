import { getPackageManagerCommand } from '@nx/devkit';

function getInstallCmd(): string {
  return getPackageManagerCommand().install;
}

function getCiInstallCmd(): string {
  return getPackageManagerCommand().ciInstall;
}

function getAddCmd(): string {
  return getPackageManagerCommand().add;
}

function getAddDevCmd(): string {
  return getPackageManagerCommand().addDev;
}

function getRmCmd(): string {
  return getPackageManagerCommand().rm;
}

function getExecCmd(): string {
  return getPackageManagerCommand().exec;
}

function getRunCmd(script: string, args = ''): string {
  return getPackageManagerCommand().run(script, args);
}

function getListCmd(): string {
  return getPackageManagerCommand().list;
}

export {
  getInstallCmd,
  getCiInstallCmd,
  getAddCmd,
  getAddDevCmd,
  getRmCmd,
  getExecCmd,
  getRunCmd,
  getListCmd,
};
