const path = require('path');
const fs = require('fs');
const folderPath = path.normalize('C:/Users/HP/HTML-builder/HTML-builder/01-read-file/text.txt');

fs.readFile(folderPath, 'utf-8',
			(error, data) => {
				if(error) {
          if (error.code === 'ENOENT') {
            console.error('myfile does not exist');
            return;
          }
          throw error
        }
          console.log(data);
});

