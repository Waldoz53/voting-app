import sqlite3 from "sqlite3"

sqlite3.verbose()
const db = new sqlite3.Database('./voting.db', err => {
  if (err) console.error("database connection error:", err.message)
  else console.log("Connected to SQLite Database!")
})

// Creates Categories table
db.run(`CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL
)`)

// Creates Nominees table
db.run(`CREATE TABLE IF NOT EXISTS nominees (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  category_id INTEGER,
  name TEXT NOT NULL,
  votes INTEGER DEFAULT 0,
  FOREIGN KEY (category_id) REFERENCES categories(id)
)`)

db.close()