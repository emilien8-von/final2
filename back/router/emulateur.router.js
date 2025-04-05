const express = require('express')
const router = express.Router()
const Emulateur = require('../controller/emulateur.controller')

router.post('/add',Emulateur.Pemulateur)
router.get('/all',Emulateur.Gemulateur)
router.get('/get/:id',Emulateur.Idemulateur)
router.delete('/delete/:id',Emulateur.Demulateur)
router.put('/put/:id',Emulateur.Cemulateur)
module.exports = router