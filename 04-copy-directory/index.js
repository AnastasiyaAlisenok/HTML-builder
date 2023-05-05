const fs = require('fs/promises');
const path = require('path');
const filesFolder = path.join(__dirname, 'files');
const filesCopyFolder = path.join(__dirname, 'files-copy');

async function copyDir() {
  try {
    const createDir = await fs.mkdir(filesCopyFolder, { recursive: true });
    const files = await fs.readdir(filesFolder, { withFileTypes: true } );

    for (const file of files) {
     fs.copyFile(`${filesFolder}/${file.name}`, `${filesCopyFolder}/${file.name}`);
    }
  } catch (err) {
    console.error(err.message);
  }
}
copyDir()