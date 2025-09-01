
const erreur = require('../middlewares/erreur')
const verifytoken = require('./indentite')

const verifyAdmin = (req,res,next) =>{
    verifytoken(req,res,() =>{ 
    if(req.user && req.user.role === "admin") {
       next()
    }
    else{
       return next(erreur(403, "seul un admin peut effacer"))
    }
 })
}

module.exports = verifyAdmin