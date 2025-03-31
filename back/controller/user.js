const Users = require('../models/pseudo')
const bcrypt = require('bcrypt')
const jwr = require('jsonwebtoken')
const ENV  = require('../config/env')
const erreur = require('../middlewares/erreur')
const cookieParser = require('cookie-parser')
const Puser = async(req,res) =>{
    try{
        const passwordH = await bcrypt.hash(req.body.password,10)
        const reponse = await Users.create({
            ...req.body,
            password : passwordH
        })
        res.status(201).json({message : 'users created!',reponse})
    }
    catch(error){
        console.log(error.message);
        
    }
}
const Guser = async (req,res) => {
     try{
        const reponse = await Users.find()
        res.status(200).json(reponse)
     }
     catch(error){
       console.log('erreur', error.message);
       
     }
}
const Iduser = async(req,res) =>{
  try
  {
     const check = await Users.findById(req.params.id)
     if(!check) return res.status(404).json('user not found')
     res.status(200).json(check)
  } catch(error){
    console.log(error.message);
    
  }
}
const Luser = async(req,res,next) =>{
    try{
        const client = await Users.findOne({email: req.body.email})
        if(!client) return res.status(404).json('pas de user')
        const comparaison = await bcrypt.compare(req.body.password,client.password)
      if(!comparaison) return res.status(400).json('mot de passe incorrect!')
        const token  = jwr.sign(
             {id: client._id},
             ENV.TOKEN,
             {expiresIn : "24h"}
        ) 
        res.cookie('access_token',token,{httpOnly:true, maxAge : 24*60*60*1000,
            secure : false,
            sameSite : 'strict'
        })
        .status(200).json('connecté')
        
    }
    catch(error){
        res.status(500).json(error.message)
        
    }
}

const Duser = async(req,res,next) => {
   try{  
    if(!req.user.id || !req.user ){
        return next(erreur(401,'Authentification necessaire'))
    }

     const user = await Users.findById(req.params.id)
     if(!user) return next(erreur(404,'user not found'))
     if(user._id.toString() != req.user.id.toString() && user.role == "admin" && user.role == "gadmin") return  next(403,'Authentifaction interdits')
        const token  = jwr.sign(
            {id: user._id},
            ENV.TOKEN,
            {expiresIn : "0"}
       ) 
        res.cookie('access_token',token,{httpOnly:true, maxAge : 0,
            secure : false,
            sameSite : 'strict'
        })

        res.status(200).json('user deconnecter')
    } catch(error){
        next(erreur(500,error.message))
    }
}

const Emailverify = async(req,res,next) => {
    try{
        const token = req.params.token
        const decode = jwr.verify(token,ENV.TOKEN)
    }
    catch(error){
        res.status(500).json(error.message)
        
    }
}

const Cuser = async (req,res,next) => {
    try{
       if(!req.user.id || !req.user)
        {
            return next(erreur(401,'Authentification requise'))
        }
        const user = await Users.findById(req.params.id)
        if(!user) return next(erreur(404,'user not found'))
            if(user._id.toString() != req.user.id.toString() && user.role == "gadmin") return  next(erreur(403,'Authentifaction interdits'))
            const reponse = await Users.findByIdAndUpdate(req.params.id, req.body,{new:true})
        res.status(200).json(reponse)
    } catch (error){
       next(erreur(500, error.message))
    }
}
module.exports = {Puser,Guser,Iduser,Duser,Luser,Cuser,Emailverify}