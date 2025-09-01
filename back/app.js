const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser'); 
const ENV = require('./config/env');
const connect = require('./config/dbmongo');
const app = express();

connect(ENV.DB_URI, ENV.DB_NAME);


const allowedOrigins = [
    'http://localhost:5173', // Développement local
    'https://final3-eta.vercel.app' // URL de  Vercel 
];

// Middlewears
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

app.use(cookieParser());

app.use(express.static('dist'));




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