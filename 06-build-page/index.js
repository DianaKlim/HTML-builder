const fs = require('fs');
const fsPromises = fs.promises;
const path = require('path');
const { Transform } = require('stream');
const components = path.join(__dirname, 'components');
const styles = path.join(__dirname, 'styles');
const src = path.join(__dirname, 'template.html');

const dest = path.join(__dirname, 'project-dist');
const assets = path.join(__dirname, 'assets');
const destAssets = path.join(dest, 'assets');
const destHtml = path.join(dest, 'index.html');
const destStyle = path.join(dest, 'style.css');

const doNothing = () => { };




fsPromises
    .mkdir(dest, { recursive: true }, doNothing)
    .then(doNothing);


(function name() {
    const readHtml = fs.createReadStream(src, 'utf8');
    const indexHtml = fs.createWriteStream(destHtml);
    let dataHtml = '';
    readHtml.on('data', data => {
        dataHtml = data.toString();
       
        fs.readdir(components, {withFileTypes: true}, (err, data) => {
            const arrComponents = [];
            data.forEach(file => {
                const nameComponent = file.name.slice(0, file.name.length - 5);
                arrComponents.push(`{{${nameComponent}}}`);
            });

            fsPromises
            .readdir(components, (err, data))
            .then(res => {
                res.forEach((comp, index) => {
                    const readableStream = fs.createReadStream(path.join(__dirname, 'components', comp), 'utf8');
                    readableStream.on('data', data => {
                        // console.log(data);
                        dataHtml = dataHtml.replace(arrComponents[index], data)
                        if(!arrComponents.find(component => dataHtml.includes(component))) {
                            indexHtml.write(dataHtml)
                        }
                    })
                })
            })
        })
    })
})();


(function copyStyles() {
    const writeableStream = fs.createWriteStream(destStyle);

    fs.readdir(styles, { withFileTypes: true }, (err, files) => {
        files.forEach((file) => {
   
            if (!file.isDirectory() && path.extname(file.name) === '.css') {
                let readableStream = fs.createReadStream(path.join(styles, file.name), 'utf8');

                const addEnter = new Transform({
                    transform(chunk, encoding, callback) {
                        this.push(chunk);
                        this.push('\n');
                        callback();
                    }
                })
                readableStream.pipe(addEnter).pipe(writeableStream);
            }
        })
    })

})();


(function copyAssets() {

    fsPromises
    .rm(destAssets, {force: true, recursive: true}, doNothing)
    .then(() => {
        fsPromises
        .mkdir(destAssets, { recursive: true }, doNothing)
        .then(() => {
          fsPromises
            .readdir(assets, {withFileTypes: true}, doNothing)
            .then( (files) => { 
                files.forEach(file => {
                    const folderName = file.name;
                    if(file.isDirectory()) {
                        fsPromises.mkdir(path.join(destAssets, file.name));
                        fs.readdir(path.join(assets, file.name), {withFileTypes: true}, (err, folders) => { 
                            folders.forEach(file => {
                                fsPromises.copyFile(path.join(assets, folderName, file.name), path.join(destAssets, folderName, file.name));
                            })
                        })
                    }
            })
            })
        });
    });
   




    // fs.mkdir(destAssets, { recursive: true }, (err => {
    //     if (err) {
    //         throw new Error('Folder already exist')
    //     }
    // }))
 

    // fsPromises
    // .readdir(assets, {withFileTypes: true}, doNothing)
    // .then( (files) => { 
    //     files.forEach(file => {
    //         if(file.isDirectory()) {
    //             console.log(file.name)
    //             const items = fsPromises.mkdir(path.join(destAssets, file.name));
    //             console.log(items)
    //             // fs.readdir(path.join(assets, file.name), {withFileTypes: true}, (err, folders) => { 
    //             //     folders.forEach(file => {
                        
    //             //         fsPromises.copyFile(path.join(assets, file.name), path.join(destAssets, file.name));
    //             //     })
    //             // })
    //         }
    // })
    // })
})()










// -----------------------------------------------------------------------------
// async function readHtml() {
//     return await fsPromises.readFile(src, 'utf8', (err, data) => {
//     })
// }



// async function readHtmlComponents(data) {
//     // return await fsPromises.readFile(path.join(components, 'header.html'), 'utf8', (err, data) => {
//     // })
//     let arrComponents = [];
//     await fsPromises.readdir(components, { withFileTypes: true }, (err, files) => {
//     }).then((files) => {
//         (files.forEach(file => {
//             arrComponents.push(file.name.slice(0, file.name.length - 5));
//         }))
//         arrComponents.forEach(async (file) => {
//             if (data.includes(`{{${file}}}`)) {
//                 const dataComponent = await read(file);
//                 // console.log(dataComponent);
//                 data = data.replace(`{{${file}}}`, dataComponent);
    
                
    
//             }
//         })
//     })
//     console.log(data)
//     return arrComponents
// }



// // async function findComponents (data) {

// // }

// // async function replaceHtmlComponents(data, dataReplace) {

// //     data = data.replace('{{header}}', dataReplace);
// //     fs.writeFile(destHtml, data, function (err,data) {
// //     });
// // }


// async function replaceHtmlComponents(data, nameHtmlComponents) {
//     console.log(typeof(data))
//     console.log(nameHtmlComponents)

//     nameHtmlComponents.forEach(async (file) => {
//         if (data.includes(`{{${file}}}`)) {
//             const dataComponent = await read(file);
//             // console.log(dataComponent);
//             data = data.replace(`{{${file}}}`, dataComponent);

//             console.log(file)
//             // data = 1;

//         }
//     })
//     console.log('data')
//     // console.log(data)
//     return data

//     // const res = nameHtmlComponents.reduce(async (result, file) => {
//     //     if (result.includes(`{{${file}}}`)) {
//     //         const dataComponent = await read(file);
//     //         return result.replace(`{{${file}}}`, dataComponent);
//     //     }
//     //     return result
//     // }, data)
//     // console.log(res)
//     // // const b = await a(data)
//     // // console.log(b)
//     return data
// }


// async function read(file) {
//     return await fsPromises.readFile(path.join(components, file + '.html'), 'utf8', () => {
//     })
// }


// async function go() {
//     let dataHtml = await readHtml();
//     let nameHtmlComponents = await readHtmlComponents(dataHtml);
//     // let allComponents = await findComponents(dataHtml)

//     let data = await replaceHtmlComponents(dataHtml, nameHtmlComponents);
//     // await fs.writeFile(destHtml, data, function (err, data) {
//     // });
//     console.log('data2')
// }

// go();