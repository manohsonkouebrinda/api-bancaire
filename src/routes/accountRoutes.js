const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');
const accountValidator = require('../validators/accountValidator');

// Routes
router.post(
  '/accounts',
  accountValidator.validateCreateAccount,
  accountController.createAccount
);

router.get('/accounts', accountController.getAllAccounts);
router.get('/accounts/:id', accountController.getAccountById);
router.delete('/accounts/:id', accountController.deleteAccount);

router.post(
  '/accounts/:id/deposit',
  accountValidator.validateTransaction,
  accountController.deposit
);

router.post(
  '/accounts/:id/withdraw',
  accountValidator.validateTransaction,
  accountController.withdraw
);

router.get('/accounts/:id/transactions', accountController.getTransactions);

module.exports = router;
