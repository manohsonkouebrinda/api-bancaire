const accountService = require('../services/accountService');

class AccountController {
  async createAccount(req, res, next) {
    try {
      const { clientName, clientEmail, currency } = req.body;
      const account = await accountService.createAccount(clientName, clientEmail, currency);
      res.status(201).json({ success: true, data: account });
    } catch (error) {
      next(error);
    }
  }

  async getAllAccounts(req, res, next) {
    try {
      const accounts = await accountService.getAllAccounts();
      res.json({ success: true, count: accounts.length, data: accounts });
    } catch (error) {
      next(error);
    }
  }

  async getAccountById(req, res, next) {
    try {
      const account = await accountService.getAccountById(req.params.id);
      res.json({ success: true, data: account });
    } catch (error) {
      next(error);
    }
  }

  async deposit(req, res, next) {
    try {
      const { amount, description } = req.body;
      const result = await accountService.deposit(req.params.id, amount, description);
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  async withdraw(req, res, next) {
    try {
      const { amount, description } = req.body;
      const result = await accountService.withdraw(req.params.id, amount, description);
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  async getTransactions(req, res, next) {
    try {
      const transactions = await accountService.getTransactions(req.params.id);
      res.json({ success: true, count: transactions.length, data: transactions });
    } catch (error) {
      next(error);
    }
  }

  async deleteAccount(req, res, next) {
    try {
      const result = await accountService.deleteAccount(req.params.id);
      res.json({ success: true, ...result });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AccountController();

