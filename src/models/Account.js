const db = require('../config/database');

class Account {
  static async create(accountData) {
    const { id, accountNumber, clientName, clientEmail, currency } = accountData;
    
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO accounts (id, account_number, client_name, client_email, currency)
         VALUES (?, ?, ?, ?, ?)`,
        [id, accountNumber, clientName, clientEmail, currency],
        function(err) {
          if (err) reject(err);
          else resolve({ id });
        }
      );
    });
  }

  static async findById(id) {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM accounts WHERE id = ?', [id], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }

  static async findAll() {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM accounts WHERE status = "ACTIVE" ORDER BY created_at DESC', (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }

  static async updateBalance(id, newBalance) {
    return new Promise((resolve, reject) => {
      db.run('UPDATE accounts SET balance = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?', 
        [newBalance, id], 
        (err) => {
          if (err) reject(err);
          else resolve();
        });
    });
  }

  static async delete(id) {
    return new Promise((resolve, reject) => {
      db.run('UPDATE accounts SET status = "INACTIVE", updated_at = CURRENT_TIMESTAMP WHERE id = ?', 
        [id], 
        (err) => {
          if (err) reject(err);
          else resolve();
        });
    });
  }
}

module.exports = Account;
