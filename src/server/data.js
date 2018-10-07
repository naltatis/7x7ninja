const mysql = require("mysql");
const config = require("../../config.json");
const { listFromDB, itemForDB } = require("./converter");

let connection = null;

function handleDisconnect() {
  connection = mysql.createConnection(config.mysql);

  connection.connect(function(err) {
    if (err) {
      // tslint:disable-next-line no-console
      console.log("error when connecting to db:", err);
      setTimeout(handleDisconnect, 2000);
    }
  });
  connection.on("error", function(err) {
    // tslint:disable-next-line no-console
    console.log("db error", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      handleDisconnect();
    } else {
      throw err;
    }
  });
}

handleDisconnect();

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
