const express = require('express')
const router = express.Router()
const Commenter = require('../controller/comments')

router.post('/add',Commenter.Pcomment)
router.get('/all',Commenter.Gcomment)
router.delete('delete/:id',Commenter.DComment)
router.put('change/:id',Commenter.Ccomment)
router.get('/game/:id',Commenter.GetCommentsForGame)

module.exports = router