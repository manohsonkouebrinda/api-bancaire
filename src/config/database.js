const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Version simplifiée qui fonctionne sur Render
const db = new sqlite3.Database(':memory:');

console.log('✅ Base de données SQLite en mémoire initialisée');

// Créer les tables
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS accounts (
      id TEXT PRIMARY KEY,
      account_number TEXT UNIQUE,
      client_name TEXT,
      client_email TEXT,
      balance REAL DEFAULT 0,
      currency TEXT DEFAULT 'XAF',
      status TEXT DEFAULT 'ACTIVE',
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS transactions (
      id TEXT PRIMARY KEY,
      account_id TEXT,
      type TEXT,
      amount REAL,
      description TEXT,
      balance_after REAL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

module.exports = db;
