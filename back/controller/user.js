const Users = require('../models/pseudo')
const bcrypt = require('bcrypt')

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
const Luser = async(req,res) =>{}

const Duser = async(req,res) => {
   try{  
     const check = await Users.findById(req.params.id)
     if(!check) return res.status(400).json('user not found')
        await Users.findOneAndDelete(req.body._id)
        res.status(200).json('user delete')
    } catch(error){
        console.log(error.message);
        
    }
}

const verify = async(req,res) => {}

const Cuser = async (req,res) => {
    try{
        const check = await Users.findById(req.params.id)
        if(!check) return res.status(404).json('user not found')
            const reponse = await Users.findByIdAndUpdate(req.params.id, req.body,{new:true})
        res.status(200).json(reponse)
    } catch (error){
        console.log(error.message);
    }
}
module.exports = {Puser,Guser,Iduser,Duser,Luser,Cuser,verify}