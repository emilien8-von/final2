const express = require('express')
const Console = require('../controller/console.controller')
const router = express.Router()

router.post('/add',Console.Pconsole)
router.get('/all',Console.Gconsole)
router.get('/get/:id',Console.Idconsole)
router.delete('/delete/:id',Console.Dconsole)
router.put('/put/:id',Console.Mconsole)
module.exports = router