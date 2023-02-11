// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { readdirSync, readFileSync } from 'fs';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { join } from 'path';

const getIcsFiles = () => {
  const dirPath = join(__dirname, '../../ics-files');
  const dir = readdirSync(dirPath);
  return dir.map((file) => readFileSync(join(dirPath, file), 'utf-8'));
};

export { getIcsFiles };
