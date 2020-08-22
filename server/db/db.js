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
    unique: false,
    validate: {
      notEmpty: true,
    }
  },
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  songId: {
    type: STRING,
    unique: false,
    allowNull: false,
  },
  artists: {
    type: ARRAY(STRING),
    unique: false,
  },
  energy: {
    type: FLOAT,
    allowNull: false,
    unique: false,
  },
  danceability: {
    type: FLOAT,
    allowNull: false,
    unique: false,
  },
  key: {
    type: STRING,
    allowNull: false,
    unique: false,
  },
  camelotKey: {
    type: STRING,
    allowNull: false,
    unique: false,
  },
  tempo: {
    type: INTEGER,
    allowNull: false,
    unique: false,
  },
  uri: {
    type: STRING,
    allowNull: false,
    unique: false,
  }
})

Song.belongsTo(Session, { unique: false });
Session.hasMany(Song, { unique: false });

module.exports = { db, Session, Song };