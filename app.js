const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
require('dotenv').config();

const accountRoutes = require('./src/routes/accountRoutes');
const errorMiddleware = require('./src/middlewares/errorMiddleware');
const swaggerSpec = require('./src/utils/swagger');
require('./src/config/database'); // Initialise la DB

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Documentation Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api', accountRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'API bancaire fonctionne' });
});

// Redirection racine
app.get('/', (req, res) => {
  res.redirect('/api-docs');
});

// Gestionnaire d'erreurs (doit être le dernier middleware)
app.use(errorMiddleware);

module.exports = app;
