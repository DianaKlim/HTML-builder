const fs = require('fs');
const path = require('path');
const dest = path.join(__dirname, 'project-dist', 'bundle.css');
const src = path.join(__dirname, 'styles');
const { Transform } = require('stream');


const writeableStream = fs.createWriteStream(dest);

fs.readdir(src, { withFileTypes: true }, (err, files) => {
    files.forEach((file) => {
        if (!file.isDirectory() && path.extname(file.name) === '.css') {
            let readableStream = fs.createReadStream(path.join(src, file.name), 'utf8');
            // readableStream.on('data', data => {
            //     writeableStream.write(data.toString() + '\n')})
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