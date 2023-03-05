import { Command } from 'commander';
import { mkdirSync } from 'fs';
import { join } from 'path';
const program = new Command();

const start = () => {
  program.option('--first').option('-s, --separator <char>');
  program.parse();
  const opts = program.opts();
  const limit = opts['first'] ? 1 : undefined;
  console.log(program.args);
};

program
  .command('init <directory>')
  .description('initialize bundle-tracer directory')
  .action((directory) => {
    mkdirSync(`./.bundle-tracer`);
  });

program.parse();
