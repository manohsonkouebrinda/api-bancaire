const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, '../../bank.db'));

db.serialize(() => {
  // Table des comptes
  db.run(`
    CREATE TABLE IF NOT EXISTS accounts (
      id TEXT PRIMARY KEY,
      account_number TEXT UNIQUE NOT NULL,
      client_name TEXT NOT NULL,
      client_email TEXT UNIQUE NOT NULL,
      balance REAL DEFAULT 0,
      currency TEXT DEFAULT 'XAF',
      status TEXT DEFAULT 'ACTIVE',
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Table des transactions
  db.run(`
    CREATE TABLE IF NOT EXISTS transactions (
      id TEXT PRIMARY KEY,
      account_id TEXT NOT NULL,
      type TEXT CHECK(type IN ('DEPOSIT', 'WITHDRAWAL')),
      amount REAL NOT NULL,
      description TEXT,
      balance_before REAL NOT NULL,
      balance_after REAL NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (account_id) REFERENCES accounts(id)
    )
  `);
});

console.log('✅ Base de données SQLite initialisée');

module.exports = db;
