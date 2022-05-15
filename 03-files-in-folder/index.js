const { readdir } = require('fs/promises');
const { stat } = require('fs');
const path = require('path');
const { stdout } = process;

const folderPath = path.join(__dirname, 'secret-folder');

async function readDirectory(dirPath) {
  try {
    const files = await readdir(dirPath, { withFileTypes: true });
    for (const dirent of files) {
      if (dirent.isFile()) {
        stat(path.join(folderPath, dirent.name), (error, stats) => {
          if (error) {
            stdout.write(`\nError ${error.message}`);
          } else {
            stdout.write(`\n${path.parse(dirent.name).name} - ${path.extname(dirent.name).slice(1)} - ${stats.size / 1000}kb`);
          }
        });
      }
    }
  } catch (error) {
    stdout.write(`Error: ${error.message}\n`);
  }
}

readDirectory(folderPath);