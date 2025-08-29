const Users = require('../models/pseudo')
const bcrypt = require('bcrypt')
const jwr = require('jsonwebtoken')
const ENV  = require('../config/env')
const erreur = require('../middlewares/erreur')
const { sendEmail, sendVerificationEmail, createResetCodeEmailHTML } = require('../services/mail')
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
        await sendVerificationEmail(reponse.email, reponse.pseudo, token);
        res.status(201).json({message : 'users created!, un message vous sera envoyés',reponse})
    }
    catch(error){
        console.log(error.message);
        
    }
}
//Partie Get
const Guser = async (req, res, next) => {
    // On s'assure que seul un admin peut lister tous les utilisateurs
    if (req.user.role !== 'admin') {
        return next(erreur(403, "Action non autorisée."));
    }
    try {
        // LA CORRECTION : On utilise .select('-password') pour exclure le champ du mot de passe
        const reponse = await Users.find().select('-password');
        res.status(200).json(reponse);
    } catch (error) {
        next(erreur(500, error.message));
    }
};
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
            user.isActif = true;
            await user.save();
        const token = jwr.sign(
            { id: user._id, role: user.role }, // Informations à stocker dans le token
            ENV.TOKEN,
            { expiresIn: '1d' } // Le token expire dans 1 jour
        );

        // 4. Séparer le mot de passe du reste des données utilisateur
        const { password: userPassword, ...userInfo } = user._doc;

        res.cookie('access_token', token, {
            httpOnly: true, // Le cookie n'est pas accessible via JavaScript côté client (contrer les attaques XSS)
             secure: true, // À activer quand on est en ligne (HTTPS)
             sameSite: 'none' // Autre mesure de sécurité pour évité (CSRF)
        }).status(200).json(userInfo); // Pour envoiyer les données de l'utilisateur

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
            user.isActif = false;
            await user.save();
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
const forgotPassword = async (req, res, next) => {
    const { email } = req.body;

    try {
        const user = await Users.findOne({ email });

        if (!user) {
            return res.status(200).json({ message: "Si un compte est associé à cet email, un code de vérification a été envoyé." });
        }

        const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
        const resetCodeExpires = Date.now() + 10 * 60 * 1000;

        user.passwordResetCode = resetCode;
        user.passwordResetExpires = resetCodeExpires;
        
        // LA CORRECTION CRITIQUE EST ICI :
        await user.save(); 

        // Pour vérifier, vous pouvez ajouter ce log :
        console.log('Code sauvegardé pour l\'utilisateur:', user.pseudo);

        const emailHTML = createResetCodeEmailHTML(user.pseudo, resetCode);
        await sendEmail(user.email, "Votre code de réinitialisation de mot de passe", emailHTML);

        res.status(200).json({ message: "Si un compte est associé à cet email, un code de vérification a été envoyé." });

    } catch (error) {
        next(erreur(500, error.message));
    }
};

const verifyResetCode = async (req, res, next) => {
    const { email, code } = req.body;

    // LA CORRECTION : On ajoute une vérification au début
    if (!email || !code) {
        return next(erreur(400, "L'email et le code sont requis."));
    }

    const trimmedCode = code.trim(); 

    try {
        const user = await Users.findOne({ email });

        if (
            !user ||
            !user.passwordResetCode ||
            user.passwordResetCode !== trimmedCode ||
            user.passwordResetExpires < Date.now()
        ) {
            return next(erreur(400, "Code invalide ou expiré. Veuillez réessayer."));
        }

        // ... le reste de la fonction
        user.passwordResetCode = null;
        user.passwordResetExpires = null;
        await user.save();

        const resetToken = jwr.sign({ id: user._id }, ENV.TOKEN, { expiresIn: '25m' });
        res.status(200).json({ resetToken });

    } catch (error) {
        next(erreur(500, error.message));
    }
};

const resetPassword = async (req, res, next) => {
    const { resetToken, newPassword } = req.body;

    if (!resetToken || !newPassword) {
        return next(erreur(400, "Informations manquantes."));
    }
     if (newPassword.length < 3) { // Utilisez la même valeur que dans votre modèle
        return next(erreur(400, "Le mot de passe doit contenir au moins 3 caractères."));
      }
    try {
        const decoded = jwr.verify(resetToken, ENV.TOKEN);
        const user = await Users.findById(decoded.id);

        if (!user) {
            // Cette erreur est importante si l'utilisateur a été supprimé entre-temps
            return next(erreur(404, "Le lien est invalide ou l'utilisateur n'existe plus."));
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        user.password = hashedPassword;
        // On s'assure que le token ne peut plus être utilisé
        user.passwordResetCode = undefined;
        user.passwordResetExpires = undefined;
        await user.save();

        // LA CORRECTION : On renvoie une réponse JSON claire
        res.status(200).json({ message: "Votre mot de passe a été réinitialisé avec succès." });

    } catch (error) {
        console.error("ERREUR DÉTAILLÉE DANS resetPassword:", error);

        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
                console.error("ERREUR JWT:", error.name, error.message); 
            return next(erreur(401, "Le lien de réinitialisation est invalide ou a expiré. Veuillez recommencer."));
        }
        // Pour tout autre cas, on renvoie une erreur générique
        next(erreur(500, "Une erreur interne est survenue."));
    }
};
const getDashboardStats = async (req, res, next) => {
    try {
        // On compte le nombre de documents dans chaque collection
        const gameCount = await Jeux.countDocuments();
        const userCount = await Users.countDocuments();
        const consoleCount = await Console.countDocuments();

        // On renvoie un objet avec toutes les statistiques
        res.status(200).json({
            games: gameCount,
            users: userCount,
            consoles: consoleCount
        });
    } catch (error) {
        next(erreur(500, error.message));
    }
};
const updateUserRoleByAdmin = async (req, res, next) => {
    // On vérifie que la personne qui fait la requête est bien un admin
    if (req.user.role !== 'admin') {
        return next(erreur(403, "Action non autorisée."));
    }

    // On récupère le nouveau rôle depuis le corps de la requête
    const { role } = req.body;
    
    // On vérifie que le rôle est valide (correspond à l'enum du modèle)
    const validRoles = ["user", "admin"];
    if (!role || !validRoles.includes(role)) {
        return next(erreur(400, "Le rôle fourni est invalide."));
    }

    try {
        const userToUpdate = await Users.findById(req.params.id);
        if (!userToUpdate) {
            return next(erreur(404, 'Utilisateur non trouvé'));
        }

        // On met à jour uniquement le champ "role"
        userToUpdate.role = role;
        await userToUpdate.save();

        // On renvoie l'utilisateur mis à jour (sans le mot de passe)
        const { password, ...userInfo } = userToUpdate._doc;
        res.status(200).json(userInfo);

    } catch (error) {
        next(erreur(500, error.message));
    }
};
const forceLogoutByAdmin = async (req, res, next) => {
    if (req.user.role !== 'admin') {
        return next(erreur(403, "Action non autorisée."));
    }
    try {
        const userToLogout = await Users.findById(req.params.id);
        if (!userToLogout) {
            return next(erreur(404, 'Utilisateur non trouvé'));
        }

        userToLogout.isActif = false;
        await userToLogout.save();

        // La déconnexion réelle se fera la prochaine fois que l'utilisateur essaiera
        // d'utiliser son token, mais son statut est maintenant "inactif".
        // Pour une déconnexion immédiate, il faudrait une blacklist de tokens.
        res.status(200).json({ message: `Le statut de ${userToLogout.pseudo} a été mis sur "inactif".` });

    } catch (error) {
        next(erreur(500, error.message));
    }
};
const createContactEmailHTML = (senderName, senderEmail, message) => {
    return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px;">
            <h2 style="color: #501794;">Nouveau Message depuis Alpha Gaming</h2>
            <p>Vous avez reçu un nouveau message via le formulaire de contact de votre site.</p>
            <hr>
            <p><strong>Nom :</strong> ${senderName}</p>
            <p><strong>Email de l'expéditeur :</strong> <a href="mailto:${senderEmail}">${senderEmail}</a></p>
            <p><strong>Message :</strong></p>
            <p style="background-color: #f2f2f2; padding: 15px; border-radius: 5px;">
                ${message.replace(/\n/g, '<br>')}
            </p>
        </div>
    `;
};

const handleContactForm = async (req, res, next) => {
    const { name, email, message } = req.body;

    // Validation simple
    if (!name || !email || !message) {
        return next(erreur(400, "Tous les champs sont requis."));
    }

    try {
        const emailHTML = createContactEmailHTML(name, email, message);
        
        // On envoie l'email À VOUS-MÊME (l'admin du site)
        await sendEmail(ENV.EMAIL_USER, `Nouveau message de ${name}`, emailHTML);

        res.status(200).json({ message: "Votre message a bien été envoyé. Merci !" });

    } catch (error) {
        console.error("Erreur lors de l'envoi de l'email de contact:", error);
        next(erreur(500, "Le service de messagerie est actuellement indisponible."));
    }
};

module.exports = {Puser,Guser,Iduser,Duser,EffacerUser,Luser,Cuser
    ,Emailverify,updateProfil,updateUserPassword,forgotPassword,verifyResetCode,resetPassword,getDashboardStats,
    updateUserRoleByAdmin,forceLogoutByAdmin,handleContactForm
}