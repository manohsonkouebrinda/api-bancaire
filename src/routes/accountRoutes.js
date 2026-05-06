const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');
const accountValidator = require('../validators/accountValidator');

/**
 * @swagger
 * /api/accounts:
 *   post:
 *     summary: Créer un compte bancaire
 *     tags: [Comptes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - clientName
 *               - clientEmail
 *             properties:
 *               clientName: { type: string, example: "Brinda MANOH" }
 *               clientEmail: { type: string, example: "brinda@email.com" }
 *               currency: { type: string, example: "XAF" }
 *     responses:
 *       201:
 *         description: Compte créé
 */
router.post(
  '/accounts',
  accountValidator.validateCreateAccount,
  accountController.createAccount
);

/**
 * @swagger
 * /api/accounts:
 *   get:
 *     summary: Lister tous les comptes
 *     tags: [Comptes]
 *     responses:
 *       200:
 *         description: Liste des comptes
 */
router.get('/accounts', accountController.getAllAccounts);

/**
 * @swagger
 * /api/accounts/{id}:
 *   get:
 *     summary: Consulter un compte par son ID
 *     tags: [Comptes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Détails du compte
 *       404:
 *         description: Compte non trouvé
 */
router.get('/accounts/:id', accountController.getAccountById);

/**
 * @swagger
 * /api/accounts/{id}/deposit:
 *   post:
 *     summary: Effectuer un dépôt
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [amount]
 *             properties:
 *               amount: { type: number, example: 50000 }
 *               description: { type: string, example: "Dépôt espèces" }
 *     responses:
 *       200:
 *         description: Dépôt effectué
 */
router.post(
  '/accounts/:id/deposit',
  accountValidator.validateTransaction,
  accountController.deposit
);

/**
 * @swagger
 * /api/accounts/{id}/withdraw:
 *   post:
 *     summary: Effectuer un retrait
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [amount]
 *             properties:
 *               amount: { type: number, example: 20000 }
 *               description: { type: string, example: "Retrait guichet" }
 *     responses:
 *       200:
 *         description: Retrait effectué
 *       400:
 *         description: Solde insuffisant
 */
router.post(
  '/accounts/:id/withdraw',
  accountValidator.validateTransaction,
  accountController.withdraw
);

/**
 * @swagger
 * /api/accounts/{id}/transactions:
 *   get:
 *     summary: Historique des transactions
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Liste des transactions
 */
router.get('/accounts/:id/transactions', accountController.getTransactions);

/**
 * @swagger
 * /api/accounts/{id}:
 *   delete:
 *     summary: Fermer un compte
 *     tags: [Comptes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Compte désactivé
 *       404:
 *         description: Compte non trouvé
 */
router.delete('/accounts/:id', accountController.deleteAccount);

module.exports = router;
