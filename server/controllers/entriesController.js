const Entry = require('../models/Entry');
const { body, validationResult } = require('express-validator');

// @desc    Récupérer toutes les entrées de l'utilisateur
// @route   GET /api/entries
// @access  Private
const getEntries = async (req, res, next) => {
    try {
        const entries = await Entry.find({ user: req.user._id }).sort({ date: -1 });
        res.status(200).json(entries);
    } catch (error) {
        next(error);
    }
};

// @desc    Ajouter une nouvelle entrée
// @route   POST /api/entries
// @access  Private
const addEntry = async (req, res, next) => {
    try {
        // Validation
        await body('name').trim().notEmpty().withMessage('Le nom du repas est requis').run(req);
        await body('calories').isInt({ min: 0, max: 10000 }).withMessage('Calories invalides').run(req);
        await body('meal').isIn(['breakfast', 'lunch', 'dinner', 'snack']).withMessage('Type de repas invalide').run(req);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array()[0].msg });
        }

        const { name, calories, meal, image } = req.body;

        const entry = await Entry.create({
            user: req.user._id,
            name,
            calories: parseInt(calories),
            meal,
            image: image || null,
        });

        res.status(201).json(entry);
    } catch (error) {
        next(error);
    }
};

// @desc    Supprimer une entrée
// @route   DELETE /api/entries/:id
// @access  Private
const deleteEntry = async (req, res, next) => {
    try {
        const entry = await Entry.findById(req.params.id);

        if (!entry) {
            return res.status(404).json({ message: 'Entrée non trouvée' });
        }

        // Vérifier que l'entrée appartient à l'utilisateur
        if (entry.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Non autorisé à supprimer cette entrée' });
        }

        await entry.deleteOne();

        res.status(200).json({ message: 'Entrée supprimée avec succès' });
    } catch (error) {
        next(error);
    }
};

module.exports = { getEntries, addEntry, deleteEntry };
