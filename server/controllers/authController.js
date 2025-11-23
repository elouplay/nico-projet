const User = require('../models/User');
const { body, validationResult } = require('express-validator');

// @desc    Inscription d'un nouvel utilisateur
// @route   POST /api/auth/register
// @access  Public
const register = async (req, res, next) => {
    try {
        // Validation
        await body('name').trim().notEmpty().withMessage('Le nom est requis').run(req);
        await body('email').isEmail().withMessage('Email invalide').run(req);
        await body('password').isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caractères').run(req);
        await body('dailyGoal').optional().isInt({ min: 500, max: 10000 }).withMessage('Objectif invalide').run(req);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array()[0].msg });
        }

        const { name, email, password, dailyGoal } = req.body;

        // Vérifier si l'utilisateur existe déjà
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'Cet email est déjà utilisé' });
        }

        // Créer l'utilisateur
        const user = await User.create({
            name,
            email,
            password,
            dailyGoal: dailyGoal || 2000,
        });

        // Générer le token
        const token = user.generateToken();

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            dailyGoal: user.dailyGoal,
            token,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Connexion utilisateur
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res, next) => {
    try {
        // Validation
        await body('email').isEmail().withMessage('Email invalide').run(req);
        await body('password').notEmpty().withMessage('Le mot de passe est requis').run(req);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array()[0].msg });
        }

        const { email, password } = req.body;

        // Vérifier l'utilisateur (avec le mot de passe)
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
        }

        // Vérifier le mot de passe
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
        }

        // Générer le token
        const token = user.generateToken();

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            dailyGoal: user.dailyGoal,
            token,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { register, login };
