require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Connexion à la base de données
connectDB();

// Middlewares
app.use(cors());
app.use(express.json({ limit: '10mb' })); // Limite augmentée pour les images en base64
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Routes API
app.use('/api/auth', require('./routes/auth'));
app.use('/api/entries', require('./routes/entries'));

// Route de test API
app.get('/api', (req, res) => {
    res.json({ message: 'API CalorieVision est en ligne ✅' });
});

// Servir les fichiers statiques du frontend (en production)
const clientPath = path.join(__dirname, '../client/dist');
app.use(express.static(clientPath));

// Fallback pour le routing React (SPA)
app.get('*', (req, res) => {
    res.sendFile(path.join(clientPath, 'index.html'));
});

// Middleware de gestion des erreurs (doit être à la fin)
app.use(errorHandler);

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
    console.log(`📦 API disponible sur http://localhost:${PORT}/api`);
    console.log(`🌐 Frontend disponible sur http://localhost:${PORT}`);
});
