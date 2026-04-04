const sqlite3 = require('sqlite3').verbose();

// create or connect to database
const db = new sqlite3.Database('./tasks.db', (err) => {
    if (err) {
        console.error('Error connecting to database:', err.message);
    } else {
        console.log('Connected to SQLite database');
    }
});

// create table if not exists
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT,
            status TEXT,
            due_date TEXT
        )
    `);
});

module.exports = db;