const Category = require('../models/details')
const erreur = require('../middlewares/erreur')

const pCategory = async(req,res) =>{
    try{ 
       const reponse = await Category.create(req.body)
        res.status(201).json(reponse)
      
    }
    catch(error){
        console.log(error.message);
        
    }
}
const gCategory = async(req,res) =>{
    try{
        const reponse = await Category.find()
        res.status(200).json(reponse)
    }
    catch(error){
        console.log(error.message);
        
    }
}
const idCategory = async(req,res) =>{
    try{
        const check = await Category.findById(req.params.id)
        if(!check) return res.status(400).json("user not found")
        res.status(200).json(check)
    }
    catch(error){
        console.log(error.message);
        
    }
}
const deleteCategory = async(req,res,next) =>{
    try{
        
        
        await Category.findByIdAndDelete(req.params.id) 
        res.status(200).json('page effacer')
    }
    catch(error){
         next(erreur(500,erreur.message))
        
    }
}
const Changecategorie = async(req,res,next) =>{
    try{
          const check = await Category.findById(req.params.id)
          if(!check) return next(erreur(404,'user not found'))
            const change = await Category.findByIdAndUpdate(req.params.id, req.body,{new:true})
            res.status(200).json(change)
    } catch(error){
        next(erreur(500,error.message))
    }
}
module.exports = {pCategory,gCategory,idCategory,deleteCategory,Changecategorie}