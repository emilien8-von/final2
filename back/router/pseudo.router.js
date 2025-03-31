const express = require('express')
const router = express.Router()
const Pcontroller = require('../controller/user')
const verify = require('../middlewares/indentite')

router.post("/add",Pcontroller.Puser)
router.post("/login",Pcontroller.Luser)
router.get("/all",Pcontroller.Guser)
router.get('/get/:id',Pcontroller.Iduser)
router.delete('/delete/:id',verify,Pcontroller.Duser)
router.put('/put/:id',verify,Pcontroller.Cuser)
module.exports = router