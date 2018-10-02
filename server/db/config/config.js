const fs = require('fs');
const Op = require('sequelize').Op;

const DB_DEFAULTS = {
  dialect: 'sqlite',
  operatorsAliases: Op,
};

module.exports = {
  development: {
    ...DB_DEFAULTS,
    username: 'magicmirror_dev',
    password: 'magicmirror_pw',
    database: 'magicmirror_db',
    host: '127.0.0.1',
    storage: './db/storage/dev_magicmirror_db.sqlite'
  },
  test: {
    ...DB_DEFAULTS,
    username: 'magicmirror_test',
    password: 'magicmirror_pw',
    database: 'magicmirror_db',
    host: '127.0.0.1',
    storage: './db/storage/test_magicmirror_db.sqlite'
  },
  production: {
    ...DB_DEFAULTS,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    storage: process.env.DB_STORAGE,
    dialectOptions: {
      // ssl: {
      //   ca: fs.readFileSync(__dirname + '/mysql-ca-master.crt')
      // }
    }
  }
};
