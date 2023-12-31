const { exec } = require('child_process');

// Grab provided arguments
const [packageName] = process.argv.slice(2);

// Construct the command
const command = `pnpm nx g @nrwl/js:lib ${packageName} --publishable --importPath=@almaclaine/${packageName} --buildable --compiler=swc --unitTestRunner=vitest`;

// Execute the command
exec(command, (error, stdout, stderr) => {
  // Error checks omitted for brevity
  console.log(stdout);
});
