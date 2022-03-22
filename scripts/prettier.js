/* eslint-disable no-console */
const glob = require('glob');
const path = require('path');
const minimatch = require('minimatch');
const fs = require('fs');
const prettier = require('prettier');
const listChangedFiles = require('./listChangedFiles');

const mode = process.argv[2];
const onlyChanges = mode !== '--all';
const changedFiles = onlyChanges ? listChangedFiles() : null;

const configPath = path.resolve(__dirname, '../prettier.config.js');

const filePattern = '**/src/**/*.{js,jsx}';
const files = onlyChanges
  ? minimatch.match(changedFiles, filePattern).map((f) => f.split('SourceCode/java/ui/').pop())
  : glob.sync(filePattern, { ignore: ['**/node_modules/**'] });

console.log('Changed JS Files:');
console.log(files);

let didError = false;

for (const file of files) {
  console.log(`Formatting: ${file}`);
  const options = prettier.resolveConfig.sync(file, { config: configPath });

  try {
    const input = fs.readFileSync(file, 'utf-8');
    const output = prettier.format(input, options);
    fs.writeFileSync(file, output, 'utf-8');
  } catch (error) {
    console.log(error.message);
    didError = true;
  }
}

if (didError) {
  process.exit(1);
}
