const jwr = require('jsonwebtoken')
const ENV = require('../config/env')
const erreur = require('./erreur')
const verifie = (req,res,next) =>{
    const token = req.cookies.access_token

    if(!token) return next(erreur(401,'Acces Interdit'))
        jwr.verify(token, ENV.TOKEN,(err,user) =>{
          if(err){
            return next(erreur(403,'token  invalible',err.message))
          } else{
             req.user = user
             next()
          }
        })
}


module.exports = verifie