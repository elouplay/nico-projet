const errorHandler = (err, req, res, next) => {
    console.error('❌ Erreur:', err.message);

    // Erreurs Mongoose de validation
    if (err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map((e) => e.message);
        return res.status(400).json({ message: messages.join(', ') });
    }

    // Erreur de duplication (email déjà existant)
    if (err.code === 11000) {
        return res.status(400).json({ message: 'Cet email est déjà utilisé' });
    }

    // Erreur JWT
    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({ message: 'Token invalide' });
    }

    // Erreur JWT expiré
    if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token expiré' });
    }

    // Erreur par défaut
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};

module.exports = errorHandler;
