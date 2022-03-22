const { execFileSync } = require('child_process');

const exec = (command, args) => {
  const options = {
    cwd: process.cwd(),
    env: process.env,
    stdio: 'pipe',
    encoding: 'utf-8',
  };
  return execFileSync(command, args, options);
};

const execGitCmd = (args) => {
  return exec('git', args).trim().toString().split('\n');
};

const listChangedFiles = () => {
  const mergeBase = execGitCmd(['merge-base', 'HEAD', 'main']);
  return [
    ...execGitCmd(['diff', '--name-only', '--diff-filter=ACMRTUB', mergeBase]),
    ...execGitCmd(['ls-files', '--others', '--exclude-standard']),
  ];
};

module.exports = listChangedFiles;
