const fs = require('fs');
const process = require('process');
const readline = require('readline');
const {
  stdin: input,
  stdout: output,
} = require('process');
const rl = readline.createInterface({ input, output });
const greeting = 'Здравствуйте! Введите текст.'

fs.writeFile('file.txt', greeting, (err) => {
  if (err) console.log(err);
    rl.question(greeting, (answer) => {
      console.log(answer);
      rl.close();
    })
})