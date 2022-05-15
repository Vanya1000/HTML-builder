const fs = require('fs');
const path = require('path');
const { stdout, stdin, exit } = process;

const filePath = path.join(__dirname, 'notes.txt');
const output = fs.createWriteStream(filePath);

stdout.write('Hello! Please enter the text!\n');

stdin.on('data', data => {
  if (data.toString().trim() === 'exit') {
    exit();
  }
  output.write(data);
});

process.on('exit', () => stdout.write('Goodbye! Good luck!'));
process.on('SIGINT', exit);