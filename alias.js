const path = require('path');
const fs = require('fs');

const files = fs.readdirSync(path.resolve(__dirname, 'src'));

const directory = files.filter((name) => {
  const stat = fs.statSync(path.resolve(__dirname, 'src', name));
  return stat.isDirectory();
});

module.exports = Object.fromEntries(
  directory.map((name) => [name, path.resolve(__dirname, 'src', name)]),
);
