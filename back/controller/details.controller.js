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

module.exports = {pCategory}