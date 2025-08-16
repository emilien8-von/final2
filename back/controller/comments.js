const Comment = require('../models/comments')
const erreur = require('../middlewares/erreur')
const pseudo = require("../models/pseudo")
const { trusted } = require('mongoose')

const Pcomment = async(req,res) =>{
    try
    {
       const reponse = await Comment.create(req.body)
       res.status(201).json(reponse)
    } catch(error){
        console.log(error.message);
        
    }
}

const Gcomment = async(req,res) =>{
      try {
        // On récupère l'ID du jeu depuis les paramètres de l'URL
        const { gameId } = req.params;

        // On cherche uniquement les commentaires qui correspondent à cet ID de jeu
        const reponse = await Comment.find({ game: gameId })
                                      .populate('user', 'pseudo avatar') // Peuple avec le pseudo et l'avatar
                                      .sort({ createdAt: -1 }); // Trie du plus récent au plus ancien

        // Si reponse est vide, `find` renvoie un tableau vide [], ce qui est parfait !
        res.status(200).json(reponse);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Erreur serveur" });
    }
};

const DComment = async(req,res) =>{
    try{
     if(!req.user.id || !req.user ){
            return next(erreur(401,'Authentification necessaire'))
        }
         await Category.findByIdAndDelete(req.params.id) 
         res.status(200).json('commentaire  effacer')
    }
    catch(error){
        console.log(error.message);
        
    }
}

const Ccomment = async(req,res,next) =>{
   try{
            const check = await Category.findById(req.params.id)
            if(!check) return next(erreur(404,'user not found'))
              const change = await Category.findByIdAndUpdate(req.params.id, req.body,{new:true})
              res.status(200).json(change)
      } catch(error){
          next(erreur(500,error.message))
      }
}

const GetCommentsForGame = async (req, res,next) => {
    const GetCommentsForGame = async (req, res, next) => {
    try {
        // On récupère l'ID du jeu depuis les paramètres de l'URL
        const gameId = req.params.id;

        // LA CORRECTION : On utilise find() pour chercher tous les commentaires
        // où le champ "game" est égal à gameId.
        const comments = await Comment.find({ game: gameId })
            .populate('user', 'pseudo avatar') // "populate" est parfait ici !
            .sort({ createdAt: -1 });         // Trie du plus récent au plus ancien

        // Si `find` ne trouve rien, il renvoie un tableau vide [], ce qui est idéal pour le frontend.
        res.status(200).json(comments);

    } catch (error) {
        next(erreur(500, error.message));
    }
};
};
module.exports = {Pcomment,Gcomment,DComment,Ccomment,GetCommentsForGame}