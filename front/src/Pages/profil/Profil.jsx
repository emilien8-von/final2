import React from 'react'
import { Link } from 'react-router';
import './profil.scss'
import { Context } from '../../utils/context/Context';
import { useContext,useState,useEffect } from 'react';
import URLS from '../../utils/constants/URLS.js';
import INSTANCE from '../../utils/services/instance.js';
const Profil = () => {
   const { auth, setAuth } = useContext(Context); 
    const [formData, setFormData] = useState({ pseudo: '', email: '', avatar: '' });
    const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (auth) {
            setFormData({
                pseudo: auth.pseudo,
                email: auth.email,
                avatar: auth.avatar,
            });
        }
    }, [auth]);

    const handleInfoChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePasswordChange = (e) => {
        setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
    };

   const handleInfoSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await INSTANCE.put(`${URLS.UPDATE_PROFILE}` , formData, {
        
        });

        
        const updatedAuth = { ...auth, ...response.data };

        setAuth(updatedAuth);

        localStorage.setItem('auth', JSON.stringify(updatedAuth));
        
        // 5. Mettre à jour l'interface utilisateur
        setIsEditing(false);
        alert('Profil mis à jour avec succès !');

    } catch (error) {
        console.error('Erreur lors de la mise à jour du profil:', error);
        alert(error.response?.data?.message || 'Une erreur est survenue.');
    }
};
const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
        return alert('Les nouveaux mots de passe ne correspondent pas.');
    }
    try {
        // LA CORRECTION : On utilise .put() et on enlève l'ID de l'URL
        await INSTANCE.put(URLS.UPDATE_PASSWORD, {
            currentPassword: passwordData.currentPassword,
            newPassword: passwordData.newPassword
        });
        
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        alert('Mot de passe mis à jour avec succès !');
    } catch (error)  {
        console.error('Erreur lors de la mise à jour du mot de passe:', error);
        alert(error.response?.data?.message || 'Une erreur est survenue.');
    }
};
    const [passwordVisibility, setPasswordVisibility] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false
   });

   const togglePasswordVisibility = (field) => {
    setPasswordVisibility(prevState => ({
        ...prevState,
        [field]: !prevState[field] // On bascule uniquement la valeur du champ concerné
    }));
};

    if (!auth) {
        return <div>Veuillez vous connecter pour voir votre profil.</div>;
    } 
  return (
     <div className='profile-page-background'>
        <div className="profile-container">
            <div className="profile-header">
                <img src={auth.avatar} alt="Avatar" className="profile-avatar" referrerPolicy="no-referrer" />
                <div className="header-info">
                    <h2>{auth.pseudo}</h2>
                    <p>{auth.role}</p>
                </div>
                <button onClick={() => setIsEditing(!isEditing)} className="edit-button">
                    {isEditing ? 'Annuler' : 'Modifier le profil'}
                </button>
            </div>

            {isEditing ? (
                <form onSubmit={handleInfoSubmit} className="profile-form">
                    <div className="form-group">
                        <label htmlFor="pseudo">Pseudo</label>
                        <input type="text" name="pseudo" value={formData.pseudo} onChange={handleInfoChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" value={formData.email} onChange={handleInfoChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="avatar">URL de l'avatar</label>
                        <input type="text" name="avatar" value={formData.avatar} onChange={handleInfoChange} />
                    </div>
                    <button type="submit" className="save-button">Enregistrer les modifications</button>
                </form>
            ) : (
                <div className="profile-details">
                    <div className="detail-item"><span>Pseudo :</span> {auth.pseudo}</div>
                    <div className="detail-item"><span>Email :</span> {auth.email}</div>
                    <div className="detail-item"><span>Rôle :</span> {auth.role}</div>
                </div>
            )}

            <hr className="separator" />

            {/* --- FORMULAIRE DE MOT DE PASSE --- */}
            <h3>Changer le mot de passe</h3>
            <form onSubmit={handlePasswordSubmit} className="profile-form">
                <div className="form-group">
                    <label htmlFor="currentPassword">Mot de passe actuel</label>
                     <div className="password-input-wrapper"> {/* Conteneur pour l'ancre */}
            <input
                type={passwordVisibility.current ? 'text' : 'password'}
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
            />
            <img 
                src={passwordVisibility.current ? "/closed-eye.svg" : "/eye.svg"}
                alt="Toggle visibility"
                className="password-eye-icon"
                onClick={() => togglePasswordVisibility('current')}
            />
        </div>
    </div>
                <div className="form-group">
                    <label htmlFor="newPassword">Nouveau mot de passe</label>
                        <div className="password-input-wrapper">
            <input
                type={passwordVisibility.new ? 'text' : 'password'} // Type dynamique
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
            />
            <img
                src={passwordVisibility.new ? "/closed-eye.svg" : "/eye.svg"}
                alt="Toggle visibility"
                className="password-eye-icon"
                onClick={() => togglePasswordVisibility('new')}
            />
        </div>
    </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirmer le nouveau mot de passe</label>
                    <div className="password-input-wrapper">
            <input
                type={passwordVisibility.confirm ? 'text' : 'password'} // Type dynamique
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
              />
              <img
                src={passwordVisibility.confirm ? "/closed-eye.svg" : "/eye.svg"}
                alt="Toggle visibility"
                className="password-eye-icon"
                onClick={() => togglePasswordVisibility('confirm')}
              />
           </div>
            </div>
                <button type="submit" className="save-button">Changer le mot de passe</button>

                <p>Retourner a la page d'acceuil <Link className='link' to='/'>cliquer ici </Link>.</p>

            </form>
           </div>
     </div>
    );
}

export default Profil
