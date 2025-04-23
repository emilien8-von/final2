const express = require('express')
const router = express.Router()
const Pcontroller = require('../controller/user')
const verify = require('../middlewares/indentite')

router.post("/add",Pcontroller.Puser)
router.post("/login",Pcontroller.Luser)
router.put("/verify/:token",Pcontroller.Emailverify)
router.get("/all",Pcontroller.Guser)
router.get('/get/:id',Pcontroller.Iduser)
router.delete('/logout/:id',verify,Pcontroller.Duser)
router.delete('/delete/:id',verify,Pcontroller.EffacerUser)
router.put('/put/:id',verify,Pcontroller.Cuser)
module.exports = router