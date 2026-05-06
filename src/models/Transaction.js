const db = require('../config/database');

class Transaction {
  static async create(transactionData) {
    const { id, accountId, type, amount, description, balanceBefore, balanceAfter } = transactionData;
    
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO transactions (id, account_id, type, amount, description, balance_before, balance_after)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [id, accountId, type, amount, description, balanceBefore, balanceAfter],
        function(err) {
          if (err) reject(err);
          else resolve({ id });
        }
      );
    });
  }

  static async findByAccountId(accountId) {
    return new Promise((resolve, reject) => {
      db.all(
        'SELECT * FROM transactions WHERE account_id = ? ORDER BY created_at DESC',
        [accountId],
        (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
        }
      );
    });
  }
}

module.exports = Transaction;
