const path = require('path');
const fs = require('fs');
const folderPath = path.join(__dirname, 'text.txt');
const stream = fs.createReadStream(folderPath);

stream.on('data', (data) => {
  console.log(data.toString());
});

