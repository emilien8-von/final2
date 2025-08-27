const express = require('express')
const router = express.Router()
const Pcontroller = require('../controller/user')
const verify = require('../middlewares/indentite')
const admin = require('../middlewares/droitadmin')

router.post("/add",Pcontroller.Puser)
router.post("/login",Pcontroller.Luser)
router.post('/forgot-password', Pcontroller.forgotPassword);
router.post("/reset",Pcontroller.verifyResetCode)
router.post("/reset-password",Pcontroller.resetPassword)
router.get("/all",verify,Pcontroller.Guser)
router.get('/get/:id',Pcontroller.Iduser)
router.get('/stats', verify, Pcontroller.getDashboardStats);
router.delete('/logout/:id',verify,Pcontroller.Duser)
router.delete('/delete/:id',verify,Pcontroller.EffacerUser)
router.put('/put/:id',verify,Pcontroller.Cuser)
router.put('/profile/update',verify,Pcontroller.updateProfil)
router.put('/update',verify,Pcontroller.updateUserPassword)
router.put("/verify/:token",Pcontroller.Emailverify)
router.put('/role/:id', verify, Pcontroller.updateUserRoleByAdmin);


module.exports = router