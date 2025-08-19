const Users = require('../models/pseudo')
const bcrypt = require('bcrypt')
const jwr = require('jsonwebtoken')
const ENV  = require('../config/env')
const erreur = require('../middlewares/erreur')
const envoi = require('../services/mail')
const cookieParser = require('cookie-parser')

//Partie Post
const Puser = async(req,res) =>{
    try{
        const passwordH = await bcrypt.hash(req.body.password,10)
        const reponse = await Users.create({
            ...req.body,
            password : passwordH
        })
        const token = jwr.sign(
            {id: reponse._id},
            ENV.TOKEN,
            {expiresIn: "5m"}
        )
        await envoi(reponse,token)
        res.status(201).json({message : 'users created!, un message vous sera envoyés',reponse})
    }
    catch(error){
        console.log(error.message);
        
    }
}
//Partie Get
const Guser = async (req,res) => {
     try{
        const reponse = await Users.find()
        res.status(200).json(reponse)
     }
     catch(error){
       console.log('erreur', error.message);
       
     }
}
//Partie Get by Id
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



const Luser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // 1. Trouver l'utilisateur
        const user = await Users.findOne({ email });
        if (!user) {
            return next(erreur(404, 'Email ou mot de passe incorrect'));
        }

        // 2. Vérifier le mot de passe
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return next(erreur(401, 'Email ou mot de passe incorrect'));
        }

        // 3. Créer le token JWT
        const token = jwr.sign(
            { id: user._id, role: user.role }, // Informations à stocker dans le token
            ENV.TOKEN,
            { expiresIn: '1d' } // Le token expire dans 1 jour
        );

        // 4. Séparer le mot de passe du reste des données utilisateur
        const { password: userPassword, ...userInfo } = user._doc;

        // 5. CRÉER LE COOKIE ET L'ENVOYER AU NAVIGATEUR
        res.cookie('access_token', token, {
            httpOnly: true, // Le cookie n'est pas accessible via JavaScript côté client (sécurité)
            // secure: true, // À activer en production (HTTPS)
            // sameSite: 'strict' // Autre mesure de sécurité
        }).status(200).json(userInfo); // On renvoie les infos de l'user (sans le mot de passe)

    } catch (error) {
        next(erreur(500, error.message));
    }
};

//Parie Delete logout
const Duser = async(req,res,next) => {
   try{  
    if(!req.user.id || !req.user ){
        return next(erreur(401,'Authentification necessaire'))
    }

     const user = await Users.findById(req.params.id)
     if(!user) return next(erreur(404,'user not found'))
     if(user._id.toString() != req.user.id.toString() && user.role == "admin") return  next(403,'Action interdits')
        const token  = jwr.sign(
            {id: user._id},
            ENV.TOKEN,
            {expiresIn : "0"}
       ) 
        res.cookie('access_token',token,{httpOnly:true, maxAge : 0,
            secure : false,
            sameSite : 'strict'
        })

        res.status(200).json('user deconnecter!')
    } catch(error){
        next(erreur(500,error.message))
    }
}
//Partie Delete
const EffacerUser = async(req,res,next) =>{
    try{
        if(!req.user.id || !req.user ){
            return next(erreur(401,'Authentification necessaire'))
        }
       const user = await Users.findById(req.params.id)
       const client = await Users.findById(req.user.id)
        if (user._id.toString() !== client.id.toString() && client.role !== "admin") 
         {  
            return next(erreur(403 , 'Action interdite'))
         }  
        await Users.findByIdAndDelete(req.params.id)
        res.status(200).json("user delete!")
    } catch(error){
        next(erreur(500,error.message))
    }
}
//Partie Email verify
const Emailverify = async(req,res,next) => {
    try{
        const token = req.params.token
        const decode = jwr.verify(token,ENV.TOKEN)
        if(!decode) return next(erreur(403,'token invalide'))
         await Users.findByIdAndUpdate(decode.id,{isVerified : true}),
        res.status(200).json('Email verifié avec succès')
    }
    catch(error){
        next(error(400,'lien invalide',error.message))
        
    }
}
//Partie  Update
const Cuser = async (req, res, next) => {
    try {
        
        if (req.user.role !== 'admin' && req.user.id !== req.params.id) {
            return next(erreur(403, 'Action non autorisée. Vous ne pouvez modifier que votre propre profil.'));
        }

        // Si on passe cette vérification, l'utilisateur a le droit de continuer
        const user = await Users.findById(req.params.id);
        if (!user) return next(erreur(404, 'Utilisateur non trouvé'));

        const reponse = await Users.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(reponse);

    } catch (error) {
        next(erreur(500, error.message));
    }
}

const updateProfil = async (req, res, next) => {
    try {
        const { pseudo, email, avatar } = req.body;

        const updatedUser = await Users.findByIdAndUpdate(
            req.user.id, // Utilise l'ID du token, c'est parfait !
            { $set: { pseudo, email, avatar } },
            { new: true, runValidators: true }
        ).select('-password');

        if (!updatedUser) {
            return next(erreur(404, 'Utilisateur non trouvé'));
        }

        res.status(200).json(updatedUser);

    } catch (error) {
        next(erreur(500, error.message));
    }
};
const updateUserPassword = async (req, res, next) => {
    const { currentPassword, newPassword } = req.body;

    try {
        // 1. Récupérer l'utilisateur depuis la base de données
        const user = await Users.findById(req.user.id);
        if (!user) {
            return next(erreur(404, 'Utilisateur non trouvé'));
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return next(erreur(401, 'Mot de passe actuel incorrect'));
        }
        const isSamePassword = await bcrypt.compare(newPassword, user.password);
        if (isSamePassword) {
            return next(erreur(400, 'Le nouveau mot de passe ne peut pas être identique à l\'ancien.'));
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: 'Mot de passe mis à jour avec succès' });
    } catch (error) {
        next(erreur(500, error.message));
    }
};

module.exports = {Puser,Guser,Iduser,Duser,EffacerUser,Luser,Cuser,Emailverify,updateProfil,updateUserPassword}