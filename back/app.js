const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser'); 
const ENV = require('./config/env');
const connect = require('./config/dbmongo');
const app = express();
const logger = require('./middlewares/requestLogger');

connect(ENV.DB_URI, ENV.DB_NAME);


const allowedOrigins = [
    'http://localhost:5173', // Pour votre développement local
    'https://final3-eta.vercel.app' // Votre URL de production Vercel (SANS le slash à la fin)
];


app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true 
}));
app.use(express.json());

// Middleware pour parser les cookies et les rendre disponibles dans req.cookies
app.use(cookieParser());

// Middleware pour servir les fichiers statiques (si nécessaire)
app.use(express.static('dist'));

// Votre logger personnalisé
app.use(logger);


// --- 3. DÉFINITION DES ROUTES ---
// Les routes viennent APRÈS que tous les middlewares globaux ont été configurés.

// Importer les routers
const user = require('./router/pseudo.router');
const comment = require('./router/comment_router');
const jeux = require('./router/jeux.router');
const consoleRouter = require('./router/console.router');
const emulateur = require('./router/emulateur.router');
const gallery = require('./router/gallery.router');

// Appliquer les routers aux bonnes URL
app.use("/game/user", user);
app.use("/game/comment", comment);
app.use("/game/jeux", jeux);
app.use("/game/console", consoleRouter);
app.use("/game/emulateur", emulateur);
app.use("/game/gallery", gallery);


module.exports = app;