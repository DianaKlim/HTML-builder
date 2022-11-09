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
})()