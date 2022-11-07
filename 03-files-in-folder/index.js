const fs = require('fs');
const fsPromises = fs.promises;
const path = require('path');
const absPath = path.join(__dirname, 'secret-folder');
  

fs.readdir(absPath, {withFileTypes: true}, (err, files) => { 
  if (err)
    console.log(err);
  else {
    console.log("\nSecret-folder filenames:");
    files.forEach(file => {
      if (!file.isDirectory()) {
        fsPromises.stat(path.resolve(absPath, file.name), (err, stats) => {
        }).then((fileInfo) => {
            const name = file.name;
            const pathName = name.substr(0, name.lastIndexOf('.'));
            const ext = path.extname(file.name).substr(1);
            console.log(pathName, '-', ext, '-', fileInfo.size);
        })
      }
    })
  }
})

