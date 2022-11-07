const fs = require('fs');
const path = require('path');
const { stdin, stdout, exit } = require('process');
const absPath = path.join(__dirname, 'note.txt');
const output = fs.createWriteStream(absPath);

stdout.write('Hi! Input text\n');
stdin.on('data', data => {
    const name = data.toString().trim();
    if (name === 'exit') {
        bye();
    }
    output.write(data);
});
process.on('SIGINT', bye);


function bye() {
    stdout.write('Bye, Good lack!')
    exit();
}

//-------------------------------not work good by contr +c

// const fs = require('fs');
// const path = require('path');
// const { stdin, stdout } = process;

// fs.writeFile(
//     path.join(__dirname, 'mynotes.txt'), '',
//     (err) => {
//         if (err) throw err;
//         // console.log('Файл был создан');
//     }
// );

// stdout.write('Hi! Input text\n');
// stdin.on('data', data => {
//     const name = data.toString().trim();
//     if (name === 'exit') {
//         bye();
//     }

//     fs.appendFile(
//         path.join(__dirname, 'mynotes.txt'),
//         data,
//         err => {
//             if (err) throw err;
//             console.log('input more text');
//         }
//     );

// });

// process.on('SIGQUIT', bye);

// function bye() {
//     stdout.write('Bye, Good lack!')
//     process.exit();
// }


