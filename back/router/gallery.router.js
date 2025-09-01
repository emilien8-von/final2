const express = require('express')
const router = express.Router()
const Cgallery = require("../controller/gallery.controller")

router.post('/add',Cgallery.Post)
router.get('/all',Cgallery.Get)
router.get('/get/:id',Cgallery.getId)
router.delete('/delete/:id',Cgallery.deleteId)
router.put('/put/:id',Cgallery.ChangeId)
module.exports = router