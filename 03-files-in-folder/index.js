const { readdir } = require('fs/promises');
const fs = require('fs/promises');
const path = require('path');
const folderPath = path.join(__dirname, 'secret-folder');
let ext;
let name;
let size;
let bit;

async function readFolder() {
  try {
    const files = await readdir(folderPath, { withFileTypes: true } );
    for (const file of files) {
      if (file.isFile()) {
        ext = path.extname(file.name);
        name = path.basename(file.name, ext);
        bit = await fs.stat(`${folderPath}/${file.name}`);
        size = bit.size / 1000;
        console.log(`${name} - ${ext.slice(1, ext.length)} - ${size}kb`);
      }
    }
  } catch (err) {
    console.error(err);
  }
}
readFolder();
