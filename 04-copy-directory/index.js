const { readdir, copyFile, rm, mkdir } = require('fs/promises');
const path = require('path');
const { stdout } = process;


async function copyDir(source, target) {
  try {
    await rm(target, { recursive: true, force: true });
    await mkdir(target, { recursive: true });
    const files = await readdir(source, { withFileTypes: true });
    for (const file of files) {
      await copyFile(path.join(source, file.name), path.join(target, file.name));
    }
  } catch (err) {
    stdout.write(`\nError: ${err.message}\n`);
  }
}

copyDir(path.join(__dirname, 'files'), path.join(__dirname, 'files-copy'));