const express = require('express')
const cors = require('cors')
const cookie = require('cookie-parser')
const ENV = require('./config/env')
const connect = require('./config/dbmongo')
const app = express()

connect(ENV.DB_URI,ENV.DB_NAME)

const user = require('./router/pseudo.router')
const comment = require('./router/comment_router')
const category = require('./router/details.router')

app.use(cookie())
app.use(express.json())
app.use(cors())

app.use("/game/user",user)
app.use("/game/comment",comment)
app.use("/game/category",category)

module.exports = app