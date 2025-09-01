const Gallery = require("../models/gallery")
const erreur = require('../middlewares/erreur')

const Post = async(req,res) =>{
    try{
       const reponse = await Gallery.create(req.body)
       res.status(201).json(reponse)
    }  
    catch (error) {
         console.log(error.message);
         
    }

}

const Get = async(req,res) => {
    try{
      const reponse = await Gallery.find()
    }
    catch (error){
     console.log(error.message);
     
    }
}

const getId = async(req,res) =>{
    try{
      const check = await Gallery.findById(req.params.id)
      if(!check) return res.status(400).json("user not found")
        res.status(200).json(check)
    }
    catch(error){
        console.log(error.message);
        
    }
}

const deleteId = async(req,res,next) =>{
    try{
      if(!req.user.id || !req.user ){
            return next(erreur(401,'Authentification necessaire'))
        }
        const client = await Connecte.findById(req.user.id)
        if(client.role !== "admin"){
            return next(erreur(403,"vous n'êtes pas autorisé à modifier"))
        }
        await Category.findByIdAndDelete(req.params.id) 
        res.status(200).json('image effacer')
    }
    catch(error){
         next(erreur(500,erreur.message))
        
    }
}

const ChangeId = async(req,res,next) =>{
    try{
     const check = await Category.findById(req.params.id)
               if(!check) return next(erreur(404,'user not found'))
                 const change = await Category.findByIdAndUpdate(req.params.id, req.body,{new:true})
                 res.status(200).json(change)
    } catch (error){
     next(erreur(500,erreur.message))

    }
}
module.exports = {Post,Get,getId,deleteId,ChangeId}