const express = require('express')
const router = express.Router()
const Pcontroller = require('../controller/user')

router.post("/add",Pcontroller.Puser)
module.exports = router