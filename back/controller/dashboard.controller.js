const Jeux = require('../models/jeux')
const Console = require('../models/console')
const Users = require('../models/pseudo')
const Emulateur = require('../models/emulateur');

const getDashboardStats = async (req, res, next) => {
    try {
        // On compte le nombre de documents dans chaque collection
      const [gameCount, userCount, consoleCount, emulateurCount] = await Promise.all([
            Jeux.countDocuments(),
            Users.countDocuments(),
            Console.countDocuments(),
            Emulateur.countDocuments() // 2. On ajoute le comptage des émulateurs
        ]);

        // On renvoie un objet avec toutes les statistiques
        res.status(200).json({
            games: gameCount,
            users: userCount,
            consoles: consoleCount,
            emulateur: emulateurCount
        });
    } catch (error) {
                console.error("Erreur détaillée dans getDashboardStats:", error);
        next(erreur(500, error.message));
    }
};

module.exports={getDashboardStats}