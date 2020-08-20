const { db } = require('./server/db/db');
const chalk = require('chalk');

const sync = async (force = false) => {
  try {
    await db.sync({ force });
    console.log(chalk.green(`DB successfully connected, and synced. Force: ${force}`));
  } catch (e) {
    console.log(chalk.red('Error while connecting to database'));
    throw e;
  }
};

const seed = async () => {
  await sync(true);
};

seed()