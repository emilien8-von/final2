const express = require('express')
const router = express.Router()
const Category = require('../controller/jeux.controller')

router.post('/add',Category.pCategory)
router.get('/all',Category.gCategory)
router.get('/:id',Category.idCategory)
router.delete('/delete/:id',Category.deleteCategory)
router.put('/put/:id',Category.Changecategorie)
module.exports = router