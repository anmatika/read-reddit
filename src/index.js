import chalk from 'chalk';

require('@babel/polyfill');

const log = (text) => {
  setTimeout(() => {
    console.log(chalk.green(text));
  }, 500);
};

const main = async() => {
  await log('node-babel-starter');
  log('End.');
};

main();
