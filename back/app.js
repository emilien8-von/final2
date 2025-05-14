const express = require('express')
const cors = require('cors')
const cookie = require('cookie-parser')
const ENV = require('./config/env')
const connect = require('./config/dbmongo')
const app = express()
const logger = require('./middlewares/requestLogger')
connect(ENV.DB_URI,ENV.DB_NAME)
//ROUTER
const user = require('./router/pseudo.router')
const comment = require('./router/comment_router')
const jeux = require('./router/jeux.router')
const console = require('./router/console.router')
const emulateur = require('./router/emulateur.router')
//Middleweare
app.use(cookie())
app.use(express.json())
app.use(cors())
app.use(express.static('dist')) // Pour connecter le front et le back
app.use(logger)
//Lien pour postman
app.use("/game/user",user)
app.use("/game/comment",comment)
app.use("/game/jeux",jeux)
app.use("/game/console",console)
app.use("/game/emulateur",emulateur)
module.exports = app