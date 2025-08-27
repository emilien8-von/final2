const express = require('express')
const router = express.Router()
const Commenter = require('../controller/comments')
const verify = require('../middlewares/indentite')
router.post('/add', verify, controller.Pcomment);

router.delete('delete/:id',Commenter.DComment)
router.put('change/:id',Commenter.Ccomment)
router.get()
router.get('/all', verify, controller.getAllComments);
router.get('/game/:gameId', Commenter.Gcomment);
module.exports = router