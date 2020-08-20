const { Sequelize } = require('sequelize');
const chalk = require('chalk');
const { UUID, UUIDV4, STRING, ARRAY, FLOAT, INTEGER } = Sequelize;

const DATABASE_URL = process.env.DATABASE_URL || 'postgres://localhost:5432/digInKey';

const db = new Sequelize(DATABASE_URL, {
  logging: false,
});

const Session = db.define('session', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  }
})

const Song = db.define('song', {
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
  id: {
    type: STRING,
    primaryKey: true,
    allowNull: false,
  },
  artists: {
    type: ARRAY(STRING),
  },
  energy: {
    type: FLOAT,
    allowNull: false,
  },
  danceability: {
    type: FLOAT,
    allowNull: false,
  },
  key: {
    type: STRING,
    allowNull: false,
  },
  camelotKey: {
    type: STRING,
    allowNull: false,
  },
  tempo: {
    type: INTEGER,
    allowNull: false,
  },
  uri: {
    type: STRING,
    allowNull: false,
  }
})

Song.belongsTo(Session);
Session.hasMany(Song);

// const sync = async (force = false) => {
//   try {
//     await db.sync({ force });
//     console.log(chalk.green(`DB successfully connected, and synced. Force: ${force}`));
//   } catch (e) {
//     console.log(chalk.red('Error while connecting to database'));
//     throw e;
//   }
// };

// const seed = async () => {
//   await sync(true);
// };

// seed()

module.exports = { db, Session, Song };