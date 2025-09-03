const jwr = require('jsonwebtoken');
const ENV = require('../config/env');
const erreur = require('./erreur');

const verifie = (req, res, next) => {
   
    const token = req.cookies.access_token;

    if (!token) {
        console.log('Résultat : Aucun token trouvé. Accès refusé.');
        return next(erreur(401, 'Acces Interdit'));
    }

    console.log('Résultat : Token trouvé ! Vérification en cours...');
    jwr.verify(token, ENV.TOKEN, (err, user) => {
        if (err) {
            console.log('Erreur de vérification du token :', err.message);
            return next(erreur(403, 'Token invalide', err.message));
        } else {
            console.log('Vérification réussie. Utilisateur authentifié :', user);
            req.user = user;
            next();
        }
    });
};

module.exports = verifie;