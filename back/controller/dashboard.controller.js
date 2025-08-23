const Jeux = require('../models/jeux')
const Console = require('../models/console')
const Users = require('../models/pseudo')
const Emulateur = require('../models/emulateur');

const getDashboardStats = async (req, res, next) => {
    try {
        // On compte le nombre de documents dans chaque collection
        const gameCount = await Jeux.countDocuments();
        const userCount = await Users.countDocuments();
        const consoleCount = await Console.countDocuments();
        const emulateurCount = await Emulateur.countDocuments();

        // On renvoie un objet avec toutes les statistiques
        res.status(200).json({
            games: gameCount,
            users: userCount,
            consoles: consoleCount,
            emulateur: emulateurCount
        });
    } catch (error) {
        next(erreur(500, error.message));
    }
};

module.exports={getDashboardStats}