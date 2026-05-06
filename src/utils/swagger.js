const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Bancaire Professionnelle',
      version: '2.0.0',
      description: `API de gestion bancaire avec architecture MVC

**Étudiant :** MANOH SONKOUE Brinda
**Matricule :** 23V2302

## Architecture
- Modèles (Models)
- Contrôleurs (Controllers)
- Services (Services)
- Routes (Routes)
- Middlewares
- Validateurs

## Fonctionnalités
- Création de compte
- Dépôt et retrait
- Consultation solde
- Historique
- Fermeture de compte`
    },
    servers: [
      { url: 'http://localhost:3000', description: 'Serveur local' }
    ]
  },
  apis: ['./src/routes/*.js']
};

module.exports = swaggerJsdoc(options);
