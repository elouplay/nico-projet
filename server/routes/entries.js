const express = require('express');
const { getEntries, addEntry, deleteEntry } = require('../controllers/entriesController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Toutes les routes sont protégées par le middleware d'authentification
router.route('/').get(protect, getEntries).post(protect, addEntry);
router.route('/:id').delete(protect, deleteEntry);

module.exports = router;
