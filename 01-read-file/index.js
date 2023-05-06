const path = require('path');
const fs = require('fs');
const folderPath = path.join(__dirname, 'text.txt');

fs.readFile(folderPath, 'utf-8', (error, data) => {if(error) {
  if (error.code === 'ENOENT') {
    console.error('myfile does not exist');
    return;
  }
  throw error;
}
console.log(data);
});

