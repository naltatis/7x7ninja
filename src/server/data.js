const mysql = require("mysql");
const config = require("../../config.json");
const { listFromDB, itemForDB } = require("./converter");

const connection = mysql.createConnection(config.mysql);

connection.connect();

function all(cb) {
  connection.query(
    "SELECT * FROM images ORDER BY updated_at DESC",
    (err, result) => cb(err, listFromDB(result))
  );
}

function create(item, cb) {
  connection.query("INSERT INTO images SET ?", itemForDB(item), cb);
}

module.exports = { all, create };
