const express = require('express')
const cors = require('cors')
const cookie = require('cookie-parser')
const ENV = require('./config/env')
const connect = require('./config/dbmongo')
const app = express()

connect(ENV.DB_URI,ENV.DB_NAME)

const user = require('./router/pseudo.router')

app.use(cookie())
app.use(express.json())
app.use(cors())

app.use("/api/user",user)

module.exports = app