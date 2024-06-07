import sqlite3 from 'sqlite3';

const db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});

db.serialize(() => {
  db.run("CREATE TABLE meetings (id INTEGER PRIMARY KEY AUTOINCREMENT, room_name TEXT, url TEXT)");
  db.run("CREATE TABLE tokens (id INTEGER PRIMARY KEY AUTOINCREMENT, token TEXT, room_name TEXT)");
});

export default db;
