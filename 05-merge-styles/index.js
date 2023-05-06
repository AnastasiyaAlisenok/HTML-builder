const fs = require('fs/promises');
const path = require('path');
const folderPath = path.join(__dirname, 'styles');
let arr = [];

async function mergeStyles() {
  try {
    const files = await fs.readdir(folderPath, { withFileTypes: true } );
    for (const file of files) {
      if (file.isFile() && path.extname(file.name) === '.css') {
        let content = fs.readFile(path.resolve(`${folderPath}/${file.name}`), { encoding: 'utf8' });
        arr.push((await content).toString());
      }
    }
    fs.writeFile(path.join(__dirname, 'bundle.css'), arr.join('\n'), (error) => {
      if (error) throw error;
    });
  } catch (err) {
    console.error(err);
  }
}
mergeStyles();