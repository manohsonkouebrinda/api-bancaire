class AccountValidator {
  static validateCreateAccount(req, res, next) {
    const { clientName, clientEmail } = req.body;
    
    if (!clientName || !clientEmail) {
      return res.status(400).json({
        success: false,
        error: 'clientName et clientEmail sont requis'
      });
    }
    
    next();
  }

  static validateTransaction(req, res, next) {
    const { amount } = req.body;
    
    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        error: 'Montant invalide (doit être supérieur à 0)'
      });
    }
    
    next();
  }

  static validateId(req, res, next) {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({
        success: false,
        error: 'ID du compte requis'
      });
    }
    
    next();
  }
}

module.exports = AccountValidator;
