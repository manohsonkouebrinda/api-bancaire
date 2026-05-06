const { v4: uuidv4 } = require('uuid');
const Account = require('../models/Account');
const Transaction = require('../models/Transaction');
const generateAccountNumber = require('../utils/generateAccountNumber');

class AccountService {
  async createAccount(clientName, clientEmail, currency = 'XAF') {
    // Validation
    if (!clientName || !clientEmail) {
      throw new Error('clientName et clientEmail sont requis');
    }

    const id = uuidv4();
    const accountNumber = generateAccountNumber();

    await Account.create({
      id,
      accountNumber,
      clientName,
      clientEmail,
      currency
    });

    const account = await Account.findById(id);
    return account;
  }

  async getAllAccounts() {
    return await Account.findAll();
  }

  async getAccountById(id) {
    const account = await Account.findById(id);
    if (!account) {
      throw new Error('Compte non trouvé');
    }
    return account;
  }

  async deposit(accountId, amount, description = 'Dépôt') {
    if (!amount || amount <= 0) {
      throw new Error('Montant invalide');
    }

    const account = await Account.findById(accountId);
    if (!account) {
      throw new Error('Compte non trouvé');
    }

    const balanceBefore = account.balance;
    const balanceAfter = balanceBefore + amount;

    await Account.updateBalance(accountId, balanceAfter);

    const transactionId = uuidv4();
    await Transaction.create({
      id: transactionId,
      accountId,
      type: 'DEPOSIT',
      amount,
      description,
      balanceBefore,
      balanceAfter
    });

    return {
      transactionId,
      accountNumber: account.account_number,
      type: 'DEPOSIT',
      amount,
      balanceAfter,
      createdAt: new Date().toISOString()
    };
  }

  async withdraw(accountId, amount, description = 'Retrait') {
    if (!amount || amount <= 0) {
      throw new Error('Montant invalide');
    }

    const account = await Account.findById(accountId);
    if (!account) {
      throw new Error('Compte non trouvé');
    }

    if (account.balance < amount) {
      throw new Error('Solde insuffisant');
    }

    const balanceBefore = account.balance;
    const balanceAfter = balanceBefore - amount;

    await Account.updateBalance(accountId, balanceAfter);

    const transactionId = uuidv4();
    await Transaction.create({
      id: transactionId,
      accountId,
      type: 'WITHDRAWAL',
      amount,
      description,
      balanceBefore,
      balanceAfter
    });

    return {
      transactionId,
      accountNumber: account.account_number,
      type: 'WITHDRAWAL',
      amount,
      balanceAfter,
      createdAt: new Date().toISOString()
    };
  }

  async getTransactions(accountId) {
    const account = await Account.findById(accountId);
    if (!account) {
      throw new Error('Compte non trouvé');
    }

    return await Transaction.findByAccountId(accountId);
  }

  async deleteAccount(accountId) {
    const account = await Account.findById(accountId);
    if (!account) {
      throw new Error('Compte non trouvé');
    }

    await Account.delete(accountId);
    return { message: 'Compte désactivé avec succès' };
  }
}

module.exports = new AccountService();
