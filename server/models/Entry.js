const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    name: {
        type: String,
        required: [true, 'Le nom du repas est requis'],
        trim: true,
    },
    calories: {
        type: Number,
        required: [true, 'Le nombre de calories est requis'],
        min: [0, 'Les calories ne peuvent pas être négatives'],
        max: [10000, 'Les calories ne peuvent pas dépasser 10000'],
    },
    meal: {
        type: String,
        enum: ['breakfast', 'lunch', 'dinner', 'snack'],
        default: 'breakfast',
    },
    image: {
        type: String, // Stockage en base64
        default: null,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

// Index pour optimiser les requêtes par utilisateur et date
entrySchema.index({ user: 1, date: -1 });

module.exports = mongoose.model('Entry', entrySchema);
