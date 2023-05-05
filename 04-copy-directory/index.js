const { error } = require('console');
const fs = require('fs/promises');
const path = require('path');
let filesFolder = path.join(__dirname, 'files');


async function copyDir(folder, newFolder) {
  try{
    newFolder = folder.replace('files', 'files-copy');
    const remove = await fs.rm(newFolder, {recursive: true, force: true}, (err) => {
      if (err) throw err});
    const createDir = await fs.mkdir(newFolder, { recursive: true });
    const files = await fs.readdir(folder, { withFileTypes: true } );
    for (const file of files) {
      const stats = await fs.stat(path.join(folder, `${file.name}`));
      if (stats.isDirectory()) {
          copyDir(`${folder}/${file.name}`);

        } else {
          fs.writeFile(newFolder + '\\' + file.name, '');
          fs.copyFile(`${folder}/${file.name}`, `${newFolder}/${file.name}`);
        }
    }
} catch (err) {
        console.error(err.message);
      }
}

copyDir(filesFolder)