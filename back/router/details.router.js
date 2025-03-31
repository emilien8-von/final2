const express = require('express')
const router = express.Router()
const Category = require('../controller/details.controller')

router.post('/add',Category.pCategory)

module.exports = router