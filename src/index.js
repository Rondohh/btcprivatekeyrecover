const readline = require('readline');

const recover  = require('./utils.js');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question(`Insert your private key.\nIn the characters missing replace with '*' or '?': ` , (answer) => {

  recover(answer);

  rl.close();
});
