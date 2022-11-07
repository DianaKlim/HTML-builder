const fs = require('fs');
const fsPromises = fs.promises;
const path = require('path');
const src = path.join(__dirname, 'files');
const dest = path.join(__dirname, 'files-copy');
const doNothing = () => {};


fsPromises
.rm(dest, {force: true, recursive: true}, doNothing)
.then(doNothing);

fsPromises
.mkdir(dest, { recursive: true }, doNothing)
.then(doNothing);


fs.readdir(src, {withFileTypes: true}, (err, files) => { 
    files.forEach(file => {
      fsPromises.copyFile(path.join(src, file.name), path.join(dest, file.name));
    })
})











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



