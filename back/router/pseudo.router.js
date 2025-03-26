const express = require('express')
const router = express.Router()
const Pcontroller = require('../controller/user')

router.post("/add",Pcontroller.Puser)
router.get("/all",Pcontroller.Guser)
router.get('/get/:id',Pcontroller.Iduser)
router.delete('/delete/:id',Pcontroller.Duser)
router.put('/put/:id',Pcontroller.Cuser)
module.exports = router