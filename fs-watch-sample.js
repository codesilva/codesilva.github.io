const fs = require('node:fs');
const path = require('node:path');

console.log('Start watching target.txt for changes...');

const filename = path.resolve(__dirname, 'target.txt');

console.log('filename:', filename);

fs.watch(filename, () => {
  
});
