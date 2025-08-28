const Comment = require('../models/comments')
const erreur = require('../middlewares/erreur')
const mongoose = require('mongoose')

const Pcomment = async (req, res, next) => {
    try {
        const newComment = await Comment.create({
            ...req.body,
            user: req.user.id
        });
        const populatedComment = await Comment.findById(newComment._id).populate('user', 'pseudo avatar');
        res.status(201).json(populatedComment);
    } catch (error) {
        // AJOUTEZ CE LOG POUR VOIR L'ERREUR DÉTAILLÉE SUR RENDER
        console.error("ERREUR DANS Pcomment:", error); 
        next(erreur(500, error.message));
    }
};

// GET /game/:gameId
const Gcomment = async (req, res, next) => {
    try {
        const { gameId } = req.params;
        if (!mongoose.Types.ObjectId.isValid(gameId)) {
            return next(erreur(400, 'ID de jeu invalide'));
        }
        const comments = await Comment.find({ game: gameId })
                                      .populate('user', 'pseudo avatar')
                                      .sort({ createdAt: -1 });
        res.status(200).json(comments);
    } catch (error) {
        next(erreur(500, error.message));
    }
};

const getAllComments = async (req, res, next) => {
    // On s'assure que seul un admin peut voir tous les commentaires
    if (req.user.role !== 'admin') {
        return next(erreur(403, "Action non autorisée."));
    }
    try {
        const allComments = await Comment.find()
            .populate('user', 'pseudo avatar') // On récupère l'auteur
            .populate('game', 'titre')         // ON RÉCUPÈRE LE JEU ASSOCIÉ !
            .sort({ createdAt: -1 });

        res.status(200).json(allComments);
    } catch (error) {
        next(erreur(500, error.message));
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


module.exports = {Pcomment,Gcomment,DComment,Ccomment,getAllComments}