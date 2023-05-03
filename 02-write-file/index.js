const fs = require('fs');
const readline = require('node:readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const greeting = 'Здравствуйте! Введите текст: ';
const buy = 'Спасибо! Успехов в учебе!';

fs.writeFile('02-write-file/newtext.txt', ' ', (error) => {
  if (error) throw error;
});

let writeableStream = fs.createWriteStream('02-write-file/newtext.txt');
console.log(greeting);

rl.on('line', (answer) => {
  if (answer.toString().trim() === 'exit') {
    console.log(buy);
    rl.close();
  } else {
    writeableStream.write(`${answer}\n`)
  }
})

rl.on('SIGINT', () => {
    console.log(buy);
    rl.close()
})

