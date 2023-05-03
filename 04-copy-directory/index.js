const fs = require('fs/promises');
const path = require('path');
const filesFolder = 'C:/Users/HP/HTML-builder/HTML-builder/04-copy-directory/files'

async function copyDir() {
  try {
    const createDir = await fs.mkdir('./04-copy-directory/files-copy', { recursive: true });
    const files = await fs.readdir(filesFolder, { withFileTypes: true } );

    for (const file of files) {
     fs.copyFile(`./04-copy-directory/files/${file.name}`, `./04-copy-directory/files-copy/${file.name}`);
    }
  } catch (err) {
    console.error(err.message);
  }
}
copyDir()