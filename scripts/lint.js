/* eslint-disable no-console */
const minimatch = require('minimatch');
const { ESLint: Lint } = require('eslint');
const stylelint = require('stylelint');
const listChangedFiles = require('./listChangedFiles');
const styleLintConfig = require('../stylelint.config');

const mode = process.argv[2];
const onlyChanges = mode !== '--all';
const changedFiles = onlyChanges ? listChangedFiles() : null;

async function lintJS() {
  const filePattern = '**/src/**/*.{js,jsx}';
  const files = onlyChanges
    ? minimatch.match(changedFiles, filePattern).map((f) => f.split('SourceCode/java/ui/').pop())
    : filePattern;

  if (files.length) {
    console.log(`linting ${onlyChanges ? 'changed' : 'all'} JS files...`);

    const eslint = new Lint({ fix: false });
    const results = await eslint.lintFiles(files);

    const formatter = await eslint.loadFormatter('stylish');
    const resultText = formatter.format(results);

    console.log(resultText);
  }
}

async function lintCSS() {
  const filePattern = '**/src/**/*.css';
  const files = onlyChanges
    ? minimatch.match(changedFiles, filePattern).map((f) => f.split('SourceCode/java/ui/').pop())
    : filePattern;

  if (files.length) {
    console.log(`linting ${onlyChanges ? 'changed' : 'all'} CSS files...`);

    const styleResult = await stylelint.lint({
      config: styleLintConfig,
      files,
      formatter: 'string',
    });

    console.log(styleResult.output);
  }
}

(async function main() {
  console.time('lint');

  console.time('lintJS');
  await lintJS();
  console.timeEnd('lintJS');
  console.log('\n');

  console.time('lintCSS');
  await lintCSS();
  console.timeEnd('lintCSS');
  console.log('\n');

  console.timeEnd('lint');
})().catch((error) => {
  process.exitCode = 1;
  console.error(error);
});
