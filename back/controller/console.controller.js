const Console = require('../models/console')
const  erreur = require('../middlewares/erreur')
const mongoose = require('mongoose'); 

const Pconsole = async(req,res)=>{
    try
    {
        const reponse = await  Console.create(req.body)
        res.status(201).json(reponse)
    }
    catch(error){
        console.log(error.message);
        
    }
}

const  Gconsole = async(req,res)=>{
    try{
        const reponse = await Console.find();
        res.status(200).json(reponse)
    }
    catch(error){
        console.log(error.message)
        
    }
}
const Idconsole = async(req,res,next) =>{
     try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return next(erreur(400, 'ID de console invalide'));
        }

        const console = await Console.findById(id);
        
        if (!console) {
            return next(erreur(404, 'Console non trouvée'));
        }
        
        res.status(200).json(console);
    } catch (error) {
        next(erreur(500, error.message));
    }
}
const Dconsole = async(req,res,next)=>{
  try{
   
   await Console.findByIdAndDelete(req.params.id)
   res.status(200).json('console effacer!')
  }
  catch(error){
    next(erreur(500,erreur.message))
  }
}

const Mconsole = async(req,res,next) =>{
    try{ 
    const check = await Console.findById(req.params.id)
    if(!check) return next(erreur(404,"user not found"))
        const change = await Console.findByIdAndUpdate(req.params.id, req.body,{new:true})
         res.status(200).json(change)
    }
        catch (error)
    {
      next(erreur(500,"problème de server"))
      
    }
}
module.exports = {Pconsole,Gconsole,Dconsole,Idconsole,Mconsole}