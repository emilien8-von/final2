const Users = require('../models/pseudo')
const bcrypt = require('bcrypt')
const jwr = require('jsonwebtoken')
const ENV  = require('../config/env')
const erreur = require('../middlewares/erreur')
const envoi = require('../services/mail')
const cookieParser = require('cookie-parser')

//Partie Post
const Puser = async(req,res) =>{
    try{
        const passwordH = await bcrypt.hash(req.body.password,10)
        const reponse = await Users.create({
            ...req.body,
            password : passwordH
        })
        const token = jwr.sign(
            {id: reponse._id},
            ENV.TOKEN,
            {expiresIn: "5m"}
        )
        await envoi(reponse,token)
        res.status(201).json({message : 'users created!, un message vous sera envoyés',reponse})
    }
    catch(error){
        console.log(error.message);
        
    }
}
//Partie Get
const Guser = async (req,res) => {
     try{
        const reponse = await Users.find()
        res.status(200).json(reponse)
     }
     catch(error){
       console.log('erreur', error.message);
       
     }
}
//Partie Get by Id
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
// Partie Post login
const Luser = async(req,res,next) =>{
    try{
        const client = await Users.findOne({email: req.body.email})
        if(!client) return res.status(404).json('pas de user')
      //  if(!client.isVerified) return next(erreur(403,"Veuiller verifer votre mail"))
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
//Parie Delete logout
const Duser = async(req,res,next) => {
   try{  
    if(!req.user.id || !req.user ){
        return next(erreur(401,'Authentification necessaire'))
    }

     const user = await Users.findById(req.params.id)
     if(!user) return next(erreur(404,'user not found'))
     if(user._id.toString() != req.user.id.toString() && user.role == "admin") return  next(403,'Action interdits')
        const token  = jwr.sign(
            {id: user._id},
            ENV.TOKEN,
            {expiresIn : "0"}
       ) 
        res.cookie('access_token',token,{httpOnly:true, maxAge : 0,
            secure : false,
            sameSite : 'strict'
        })

        res.status(200).json('user deconnecter!')
    } catch(error){
        next(erreur(500,error.message))
    }
}
//Partie Delete
const EffacerUser = async(req,res,next) =>{
    try{
        if(!req.user.id || !req.user ){
            return next(erreur(401,'Authentification necessaire'))
        }
       const user = await Users.findById(req.params.id)
       const client = await Users.findById(req.user.id)
        if (user._id.toString() !== client.id.toString() && client.role !== "admin") 
         {  
            return next(erreur(403 , 'Action interdite'))
         }  
        await Users.findByIdAndDelete(req.params.id)
        res.status(200).json("user delete!")
    } catch(error){
        next(erreur(500,error.message))
    }
}
//Partie Email verify
const Emailverify = async(req,res,next) => {
    try{
        const token = req.params.token
        const decode = jwr.verify(token,ENV.TOKEN)
        if(!decode) return next(erreur(403,'token invalide'))
         await Users.findByIdAndUpdate(decode.id,{isVerified : true}),
        res.status(200).json('Email verifié avec succès')
    }
    catch(error){
        next(error(400,'lien invalide',error.message))
        
    }
}
//Partie  Update
const Cuser = async (req,res,next) => {
    try{
       if(!req.user.id || !req.user)
        {
            return next(erreur(401,'Authentification requise'))
        }
        const user = await Users.findById(req.params.id)
        if(!user) return next(erreur(404,'user not found'))
            if(user._id.toString() != req.user.id.toString() && user.role == "admin") return  next(erreur(403,'Authentifaction interdits'))
            const reponse = await Users.findByIdAndUpdate(req.params.id, req.body,{new:true})
        res.status(200).json(reponse)
    } catch (error){
       next(erreur(500, error.message))
    }
}
module.exports = {Puser,Guser,Iduser,Duser,EffacerUser,Luser,Cuser,Emailverify}