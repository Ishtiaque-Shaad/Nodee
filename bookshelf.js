var knex = require('knex')({
  client: 'mysql',
  connection: {
    host: "localhost",
    user: "root",
    password: "root",
    database: "tarex",
    charset: 'utf8',
  },
  pool: {
    max: 10,
    min: 0,
    idle: 10000,
  },
});

var DB = require('bookshelf')(knex);
 // console.log(DB); 

module.exports = DB;