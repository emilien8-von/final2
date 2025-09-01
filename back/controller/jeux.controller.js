const Category = require('../models/jeux')
const erreur = require('../middlewares/erreur')

const pCategory = async (req, res, next) => {
    if (req.user.role !== 'admin') {
        return next(erreur(403, "Action non autorisée."));
    }
    try { 
        const reponse = await Category.create(req.body);
        res.status(201).json(reponse);
    } catch(error) {
        next(erreur(500, error.message));
    }
};

const gCategory = async(req,res) =>{
    try{
         const reponse = await Category.find().sort({ createdAt: -1 });
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
const deleteCategory = async (req, res, next) => {
    if (req.user.role !== "admin") {
        return next(erreur(403, "Action non autorisée."));
    }
    try {
        const deletedGame = await Category.findByIdAndDelete(req.params.id);
        if (!deletedGame) return next(erreur(404, 'Jeu non trouvé'));
        res.status(200).json({ message: 'Jeu supprimé avec succès' });
    } catch(error) {
        next(erreur(500, error.message));
    }
};

const Changecategorie = async(req,res,next) =>{
    if (req.user.role !== 'admin') return next(erreur(403, "Action non autorisée"))
    try{
          const check = await Category.findById(req.params.id)
          if(!check) return next(erreur(404,'user not found'))
            const change = await Category.findByIdAndUpdate(req.params.id, req.body,{new:true})
            res.status(200).json(change)
    } catch(error){
        next(erreur(500,error.message))
    }
}

const getRecentGames = async (req, res, next) => {
    try {
        const recentGames = await Category.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .select('titre brand'); 

        res.status(200).json(recentGames);
    } catch (error) {
        next(erreur(500, error.message));
    }
};
module.exports = {pCategory,gCategory,idCategory,deleteCategory,Changecategorie,getRecentGames}