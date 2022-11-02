const fs = require('fs');
const path = require('path');
const finalPath = path.join(__dirname, 'text.txt');
const writableToFile = fs.createWriteStream(finalPath);
const readline = require('readline');
const rl = readline.createInterface(
  process.stdin, process.stdout);
console.log('Hello, how about keyboarding?');
rl.on('line', (line) => {
  if (line !== 'exit') {
    writableToFile.write(line + '\n');
  }
  if (line.match('exit')) {
    rl.close();
    console.log('Bye, good luck!');
  }
  rl.on('SIGINT', () => {
    console.log('Bye, good luck!');
    process.exit();
    
  });});