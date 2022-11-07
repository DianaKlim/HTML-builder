const fs = require('fs');
const fsPromises = fs.promises;
const path = require('path');
const components = path.join(__dirname, 'components');
const dest = path.join(__dirname, 'project-dist');
const destHtml = path.join(dest, 'index.html');
const destStyle = path.join(dest, 'style.html');
const styles = path.join(__dirname, 'styles');
const src = path.join(__dirname, 'template.html');
const doNothing = () => { };



fsPromises
    .mkdir(dest, { recursive: true }, doNothing)
    .then(doNothing);


async function readHtml() {
    return await fsPromises.readFile(src, 'utf8', (err, data) => {
    })
}

async function readHtmlComponents(data) {
    // return await fsPromises.readFile(path.join(components, 'header.html'), 'utf8', (err, data) => {
    // })
    let arrComponents = [];
    await fsPromises.readdir(components, { withFileTypes: true }, (err, files) => {
    }).then((files) => {
        (files.forEach(file => {
            arrComponents.push(file.name.slice(0, file.name.length - 5));
        }))
        arrComponents.forEach(async (file) => {
            if (data.includes(`{{${file}}}`)) {
                const dataComponent = await read(file);
                // console.log(dataComponent);
                data = data.replace(`{{${file}}}`, dataComponent);
    
                
    
            }
        })
    })
    console.log(data)
    return arrComponents
}



// async function findComponents (data) {

// }

// async function replaceHtmlComponents(data, dataReplace) {

//     data = data.replace('{{header}}', dataReplace);
//     fs.writeFile(destHtml, data, function (err,data) {
//     });
// }


async function replaceHtmlComponents(data, nameHtmlComponents) {
    console.log(typeof(data))
    console.log(nameHtmlComponents)

    nameHtmlComponents.forEach(async (file) => {
        if (data.includes(`{{${file}}}`)) {
            const dataComponent = await read(file);
            // console.log(dataComponent);
            data = data.replace(`{{${file}}}`, dataComponent);

            console.log(file)
            // data = 1;

        }
    })
    console.log('data')
    // console.log(data)
    return data

    // const res = nameHtmlComponents.reduce(async (result, file) => {
    //     if (result.includes(`{{${file}}}`)) {
    //         const dataComponent = await read(file);
    //         return result.replace(`{{${file}}}`, dataComponent);
    //     }
    //     return result
    // }, data)
    // console.log(res)
    // // const b = await a(data)
    // // console.log(b)
    return data
}


async function read(file) {
    return await fsPromises.readFile(path.join(components, file + '.html'), 'utf8', () => {
    })
}


async function go() {
    let dataHtml = await readHtml();
    let nameHtmlComponents = await readHtmlComponents(dataHtml);
    // let allComponents = await findComponents(dataHtml)

    let data = await replaceHtmlComponents(dataHtml, nameHtmlComponents);
    // await fs.writeFile(destHtml, data, function (err, data) {
    // });
    console.log('data2')
}

go();