import { Command } from 'commander';
import {
  mkdirSync,
  writeFileSync,
  existsSync,
  readdirSync,
  readFileSync,
  lstatSync,
} from 'fs';
import { resolve, basename, join } from 'path';
const program = new Command();

const DIR = `./.bundle-tracer`;
const CONFIG = `${DIR}/config.json`;

program
  .command('init <directory>')
  .description('initialize bundle-tracer directory')
  .action((bundleDirectory) => {
    if (!existsSync(DIR)) {
      mkdirSync(DIR);
    } else {
      console.log(`${DIR} already exists, skipping creation`);
    }

    if (!existsSync(CONFIG)) {
      const config = {
        bundleDirectory: bundleDirectory as string,
      };
      writeFileSync(join(DIR, 'config.json'), JSON.stringify(config, null, 4));
    } else {
      console.log(`config.json already exists, skipping creation`);
    }
  });

type File = {
  type: 'file';
  size: number;
  name: string;
  nameNoId: string;
  path: string;
  pathNoId: string;
};

type Directory = {
  type: 'directory';
  size: number;
  name: string;
  path: string;
  directories: Directory[];
  files: File[];
};

function isDirectory(dir: string, file: string): boolean {
  const fullPath = resolve(dir, file);
  const lstat = lstatSync(fullPath);
  return lstat.isDirectory();
}

function removeUuid(str: string) {
  if (/^[\w-]+(\w{8})\./.test(str)) {
    return str.replace(/-\w{8}\./, '.');
  } else {
    return str;
  }
}

function processFiles(dir: string, file: string): File {
  const fullPath = resolve(dir, file);
  const lstat = lstatSync(fullPath);
  const name = basename(file);
  return {
    type: 'file',
    size: lstat.size,
    name: name,
    nameNoId: removeUuid(name),
    path: fullPath,
    pathNoId: removeUuid(fullPath),
  };
}

function traceDirectory(dir: string): Directory {
  const currentDirectory = readdirSync(dir);
  const subDirectories = currentDirectory.filter((file) =>
    isDirectory(dir, file)
  );
  const subFiles = currentDirectory.filter((file) => !isDirectory(dir, file));
  const directories = subDirectories.map((file) => {
    const fullPath = resolve(dir, file);
    return traceDirectory(fullPath);
  });
  const files = subFiles.map((file) => processFiles(dir, file));
  const fileSizes = files.reduce((a, c) => a + c.size, 0);
  const dirSize = directories.reduce((a, c) => a + c.size, 0);
  return {
    type: 'directory',
    size: fileSizes + dirSize,
    name: dir,
    path: resolve(dir),
    directories,
    files,
  };
}

program
  .command('trace <directory>')
  .description('initialize bundle-tracer directory')
  .action((dir: string) => {
    const out = traceDirectory(dir);
    writeFileSync('./trace.json', JSON.stringify(out, null, 4));
  });

type FileChange = {
  path: string;
  size: number;
};

type DiffDirectoryResults = {
  addedFiles: FileChange[];
  removedFiles: FileChange[];
  addedDirectories: FileChange[];
  removedDirectories: FileChange[];
  changedFiles: FileChange[];
  changedDirectories: FileChange[];
};

type DirectoryMatch = {
  oldDir: Directory;
  newDir: Directory;
};

function diffDirectory(
  oldDir: Directory,
  newDir: Directory
): DiffDirectoryResults {
  let addedFiles: FileChange[] = [];
  let removedFiles: FileChange[] = [];
  let addedDirectories: FileChange[] = [];
  let removedDirectories: FileChange[] = [];
  let changedFiles: FileChange[] = [];
  let changedDirectories: FileChange[] = [];

  let sizeChange = 0;

  for (const { pathNoId, path, size } of oldDir.files) {
    const has = newDir.files.find((val) => val.pathNoId === pathNoId);
    if (!has) {
      sizeChange -= size;
      removedFiles.push({ path, size });
    } else {
      if (has.size !== size) {
        const diff = has.size - size;
        sizeChange += diff;
        changedFiles.push({ path, size: diff });
      }
    }
  }

  for (const { pathNoId, path, size } of newDir.files) {
    const has = oldDir.files.find((val) => val.pathNoId === pathNoId);
    if (!has) {
      sizeChange += size;
      addedFiles.push({ path, size });
    }
    // else clause handled above
  }

  if (sizeChange !== 0) {
    changedDirectories.push({ path: newDir.path, size: sizeChange });
  }

  const directoriesToCheck: DirectoryMatch[] = [];

  for (const { path, size } of newDir.directories) {
    const has = oldDir.directories.find((val) => val.path === path);
    if (!has) {
      addedDirectories.push({ path, size });
    }
  }

  for (const prevDir of oldDir.directories) {
    const { path, size } = prevDir;
    const has = newDir.directories.find((val) => val.path === path);
    if (!has) {
      removedDirectories.push({ path, size });
    } else {
      directoriesToCheck.push({ oldDir: prevDir, newDir: has });
    }
  }

  for (const dirToCheck of directoriesToCheck) {
    const out = diffDirectory(dirToCheck.oldDir, dirToCheck.newDir);
    addedDirectories = [...addedDirectories, ...out.addedDirectories];
    addedFiles = [...addedFiles, ...out.addedFiles];
    removedDirectories = [...removedDirectories, ...out.removedDirectories];
    removedFiles = [...removedFiles, ...out.removedFiles];
    changedFiles = [...changedFiles, ...out.changedFiles];
    changedDirectories = [...changedDirectories, ...out.changedDirectories];
  }

  return {
    addedDirectories,
    addedFiles,
    removedDirectories,
    removedFiles,
    changedFiles,
    changedDirectories,
  };
}

program
  .command('diff <trace1> <trace2>')
  .description('initialize bundle-tracer directory')
  .action((trace1: string, trace2: string) => {
    const dir1 = JSON.parse(readFileSync(trace1, 'utf-8')) as Directory;
    const dir2 = JSON.parse(readFileSync(trace2, 'utf-8')) as Directory;
    console.log(diffDirectory(dir1, dir2));
  });

program.parse();
