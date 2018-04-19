const mysql = require("mysql");
const config = require("../../config.json");
const { listFromDB, itemForDB } = require("./converter");

const connection = mysql.createConnection(config.mysql);

connection.connect();

function all(author, cb) {
  if (author) {
    connection.query(
      "SELECT * FROM images WHERE author=? ORDER BY updated_at DESC LIMIT 1000",
      [author],
      (err, result) => cb(err, listFromDB(result))
    );
  } else {
    connection.query(
      "SELECT * FROM images ORDER BY updated_at DESC LIMIT 1000",
      (err, result) => cb(err, listFromDB(result))
    );
  }
}

function create(item, cb) {
  connection.query("INSERT INTO images SET ?", itemForDB(item), cb);
}

module.exports = { all, create };
