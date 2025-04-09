const Emulateur = require('../models/emulateur')
const erreur = require('../middlewares/erreur')

const  Pemulateur  = async(req,res,next) =>{
    try{

        await Emulateur.create(req.body)
        res.status(200).json('emulateur ajouté')
    }
    catch(error){
      next(erreur(500,'erreur server'))
    }
}

const Gemulateur = async(req,res,next) =>{
    try{
        const reponse = await Emulateur.find(req.params.id)
        res.status(200).json(reponse)
    }
    catch(error){
        next(erreur(500,'probleme du server'))
    }
}
const Idemulateur =  async(req,res,next) =>{
    try 
  {
    const check = await Emulateur.findById(req.params.id)
    if(!check) return next(erreur(404,'emulateur not found'))
    res.status(200).json(check)
  }
  catch (error){
    next(erreur(500,erreur.message))
  }
}
const Cemulateur =  async(req,res,next) =>{
    try 
  {
    const check = await Emulateur.findById(req.params.id)
    if(!check) return next(erreur(404,'emulateur not found'))
    const change = await Emulateur.findByIdAndUpdate(req.params.id, req.body,{new:true})
      res.status(200).json(change)
  }
  catch (error){
    next(erreur(500,'probleme de serveur'))
  }
}
const Demulateur =  async(req,res,next) =>{
    try 
  {
        await Emulateur.findByIdAndDelete(req.params.id)
    res.status(200).json('emulateur retirer')
  }
  catch (error){
    next(erreur(500,erreur.message))
  }
} 


module.exports = {Pemulateur,Gemulateur,Demulateur,Cemulateur,Idemulateur}