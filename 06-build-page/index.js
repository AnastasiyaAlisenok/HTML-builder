const { error } = require('console');
const fs = require('node:fs/promises');
const path = require('path');
const distFolder = path.join(__dirname, 'project-dist');
const assetsCopyFolder = path.join(distFolder, 'assets');
const assetsFolder = path.join(__dirname, 'assets');
const stylesFolder = path.resolve(__dirname, 'styles');
const componentsFolder = path.join(__dirname, 'components');
let header;
let readHtml;
let articles;
let footer;

async function copyDir() {
  try {
    await fs.mkdir(distFolder, { recursive: true });
    await fs.mkdir(assetsCopyFolder, { recursive: true });
    const files = await fs.readdir(assetsFolder, { withFileTypes: true } );

    for (const dir of files) {
      if (dir.isDirectory()) {
        await fs.mkdir(`${assetsCopyFolder}/${dir.name}`, { recursive: true });
      }
      const folders = await fs.readdir(`${assetsFolder}/${dir.name}`, { withFileTypes: true } );
      for (const folder of folders) {
        fs.copyFile(`${assetsFolder}/${dir.name}/${folder.name}`, `${assetsCopyFolder}/${dir.name}/${folder.name}`);
      }
    }
  } catch (err) {
    console.error(err.message);
  }
}
copyDir()

let arr = [];

async function mergeStyles() {
  try {
    const files = await fs.readdir(stylesFolder, { withFileTypes: true } );
    for (const file of files) {
      if (file.isFile() && path.extname(file.name) === '.css') {
        let content = fs.readFile(path.resolve(`${stylesFolder}/${file.name}`), { encoding: 'utf8' });
        arr.push((await content).toString());
    }
   }
   fs.writeFile(path.join(distFolder, 'style.css'), arr.join('\n'), (error) => {
    if (error) throw error;
  });
} catch (err) {
     console.error(err)
   }
}
mergeStyles()

async function copyHtml() {
  try {
    const createFile = await fs.writeFile(path.join(distFolder, 'index.html'), ' ', (error) => {
      if (error) throw error;
    });
    const copyHtml = await fs.copyFile(path.join(__dirname, 'template.html'), path.join(distFolder, 'index.html'));
    header =  await fs.readFile(path.join(componentsFolder, 'header.html'), { encoding: 'utf8' });
    articles = await fs.readFile(path.join(componentsFolder, 'articles.html'), { encoding: 'utf8' });
    footer = await fs.readFile(path.join(componentsFolder, 'footer.html'), { encoding: 'utf8' });
    readHtml = await fs.readFile(path.join(distFolder, 'index.html'), { encoding: 'utf8' });
    readHtml = readHtml.replace('{{header}}', header).replace('{{articles}}', articles).replace('{{footer}}', footer);
    fs.writeFile(path.join(distFolder, 'index.html'), readHtml);
  } catch (error) {
    console.error(error.message)
  }
}

copyHtml()

