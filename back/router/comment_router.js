const express = require('express')
const router = express.Router()
const Commenter = require('../controller/comments')

router.post('/add',Commenter.Pcomment)

module.exports = router