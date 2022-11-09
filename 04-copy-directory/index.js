const fs = require('fs');
const fsPromises = fs.promises;
const path = require('path');
const src = path.join(__dirname, 'files');
const dest = path.join(__dirname, 'files-copy');
const doNothing = () => {};


(async function go() {
  await fsPromises
  .rm(dest, {force: true, recursive: true}, doNothing)
  .then(doNothing);

  await fsPromises
  .mkdir(dest, { recursive: true }, doNothing)
  .then(doNothing);


  await fs.readdir(src, {withFileTypes: true}, (err, files) => { 
      files.forEach(file => {
        fsPromises.copyFile(path.join(src, file.name), path.join(dest, file.name));
      })
  })

})()







//--------------------------------------------
// fsPromises.rm(dest, {force: true, recursive: true}, (err) => {
// }).then(() => {
    
//     fsPromises.mkdir(dest, { recursive: true }, (err, files) => {
//     }).then(() => {

//         fs.readdir(src, {withFileTypes: true}, (err, files) => { 
//             files.forEach(file => {
//               fsPromises.copyFile(path.join(src, file.name), path.join(dest, file.name));
//             })
//         })
//     })
    
// })



