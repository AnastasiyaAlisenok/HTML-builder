const fs = require('fs/promises');
const path = require('path');
const folderPath = path.resolve('./05-merge-styles/styles');
let arr = [];

async function readFolder() {
  try {
    const files = await fs.readdir(folderPath, { withFileTypes: true } );
    for (const file of files) {
      if (file.isFile() && path.extname(file.name) === '.css') {
        let content = fs.readFile(path.resolve(`./05-merge-styles/styles/${file.name}`), { encoding: 'utf8' });
        arr.push((await content).toString());
    }
   }
   fs.writeFile('05-merge-styles/bundle.css', arr.join('\n'), (error) => {
    if (error) throw error;
  });
} catch (err) {
     console.error(err)
   }
}
readFolder()