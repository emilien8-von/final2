const Comment = require('../models/comments')
const erreur = require('../middlewares/erreur')
const pseudo = require("../models/pseudo")

const Pcomment = async (req, res, next) => {
    try {
        // On crée le nouveau commentaire en utilisant l'ID de l'utilisateur
        // qui vient du token (grâce au middleware "verify")
        const newComment = await Comment.create({
            ...req.body,
            user: req.user.id // C'est plus sécurisé que de faire confiance au frontend
        });
        
        const populatedComment = await Comment.findById(newComment._id).populate('user', 'pseudo avatar');
        res.status(201).json(populatedComment);
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

const Gcomment = async (req, res, next) => {
    try {
        // 1. On récupère l'ID du jeu depuis les paramètres de l'URL
        const { gameId } = req.params;

        // 2. On vérifie si l'ID est valide (bonne pratique)
        if (!mongoose.Types.ObjectId.isValid(gameId)) {
            return next(erreur(400, 'ID de jeu invalide'));
        }

        // 3. On cherche UNIQUEMENT les commentaires où le champ "game" correspond à cet ID
        const comments = await Comment.find({ game: gameId })
                                      .populate('user', 'pseudo avatar') // On inclut les infos de l'auteur
                                      .sort({ createdAt: -1 }); // On trie du plus récent au plus ancien

        // Si find() ne trouve rien, il renvoie un tableau vide [], ce qui est parfait.
        res.status(200).json(comments);

    } catch (error) {
        console.error("Erreur dans Gcomment:", error);
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
module.exports = {Pcomment,Gcomment,DComment,Ccomment,GetCommentsForGame,getAllComments}