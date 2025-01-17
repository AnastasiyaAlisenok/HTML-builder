const fs = require('fs/promises');
const path = require('path');
let filesFolder = path.join(__dirname, 'files');



async function copyDir(folder, newFolder) {
  try{
    newFolder = folder.replace('files', 'files-copy');
    await fs.rm(newFolder, {recursive: true, force: true}, (err) => {
      if (err) throw err;});
    await fs.mkdir(newFolder, { recursive: true });
    const files = await fs.readdir(folder, { withFileTypes: true } );
    for (const file of files) {
      const stats = await fs.stat(path.join(folder, `${file.name}`));
      if (stats.isDirectory()) {
         copyDir(path.join(folder, file.name));

      } else {
        fs.writeFile(path.join(newFolder, file.name), '');
        fs.copyFile(path.join(folder, file.name), path.join(newFolder,file.name));
      }
    }
  } catch (err) {
    console.error(err.message);
  }
}

copyDir(filesFolder);
