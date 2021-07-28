const { copyFileSync, mkdirSync, existsSync } = require('fs');
const { exec } = require('child_process');
const { resolve } = require('path');

const dist = './dist';

const files = [
  'package.json',
  'package-lock.json',
];

if (!existsSync(dist))
  mkdirSync(dist);

files.forEach(file => copyFileSync(file, `${dist}/${file}`));

const command = exec(
  'npm install --only=production', {
    cwd: resolve(dist),
  },
  (e) => console.log('app builded with ', e ? 'error': 'success'),
);

command.stdout.pipe(process.stdout);
command.stderr.pipe(process.stderr);
