const express = require('express')
const router = express.Router()
const Category = require('../controller/jeux.controller')
const request = require('../middlewares/requestLogger')
const verify = require('../middlewares/indentite')

router.post('/add',Category.pCategory)
router.get('/all',request,Category.gCategory)
router.get('/get/:id',Category.idCategory)
router.delete('/delete/:id',Category.deleteCategory)
router.put('/put/:id',Category.Changecategorie)
router.get('/recent', verify, Category.getRecentGames);
module.exports = router