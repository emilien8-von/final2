const Comment = require('../models/comments')
const erreur = require('../middlewares/erreur')
const pseudo = require("../models/pseudo")

const Pcomment = async(req,res) =>{
    try
    {
       const reponse = await Comment.create(req.body)
       res.status(201).json(reponse)
    } catch(error){
        console.log(error.message);
        
    }
}

module.exports = {Pcomment}