function errorMiddleware(err, req, res, next) {
  console.error('Erreur:', err.message);
  
  // Erreurs connues
  if (err.message === 'clientName et clientEmail sont requis') {
    return res.status(400).json({ success: false, error: err.message });
  }
  if (err.message === 'Compte non trouvé') {
    return res.status(404).json({ success: false, error: err.message });
  }
  if (err.message === 'Montant invalide') {
    return res.status(400).json({ success: false, error: err.message });
  }
  if (err.message === 'Solde insuffisant') {
    return res.status(400).json({ success: false, error: err.message });
  }
  
  // Erreur par défaut
  res.status(500).json({ 
    success: false, 
    error: 'Erreur serveur interne' 
  });
}

module.exports = errorMiddleware;
