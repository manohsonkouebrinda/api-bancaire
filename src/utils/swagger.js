const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Bancaire - Devoir 304',
      version: '1.0.0',
      description: `API de gestion bancaire

**Étudiant :** MANOH SONKOUE Brinda
**Matricule :** 23V2302

## Fonctionnalités
- POST /api/accounts - Créer un compte
- GET /api/accounts - Lister les comptes
- GET /api/accounts/{id} - Consulter un compte
- POST /api/accounts/{id}/deposit - Faire un dépôt
- POST /api/accounts/{id}/withdraw - Faire un retrait
- GET /api/accounts/{id}/transactions - Voir historique
- DELETE /api/accounts/{id} - Fermer un compte`
    },
    servers: [
      { url: 'https://api-bancaire-8l05.onrender.com', description: 'Serveur Render' },
      { url: 'http://localhost:3000', description: 'Serveur local' }
    ]
  },
  apis: ['./src/routes/*.js']
};

module.exports = swaggerJsdoc(options);
