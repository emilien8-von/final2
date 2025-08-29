// Dans Reset.jsx
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import './css/reset.scss';
import URLS from '../../utils/constants/URLS';
import INSTANCE from '../../utils/services/instance';
const Reset = () => {
    const { token } = useParams();
    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [visibility, setVisibility] = useState({ new: false, confirm: false });
    const toggleVisibility = (field) => {
        setVisibility(prev => ({ ...prev, [field]: !prev[field] }));
    };

    const checkPasswordStrength = () => {
        const passwordValue = document.getElementById("newPassword").value;
        
        const majCheck = document.getElementById("maj-check");
        const specialCheck = document.getElementById("special-check");
        const chiffreCheck = document.getElementById("chiffre-check");
        const lengthCheck = document.getElementById("length-check");

        const valideImg = "/valide.png";
        const crossImg = "/croosing.svg";

        const hasMaj = /[A-Z]/.test(passwordValue);
        const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(passwordValue);
        const hasChiffre = /[0-9]/.test(passwordValue);
        const hasLength = passwordValue.length >= 3; 

        majCheck.src = hasMaj ? valideImg : crossImg;
        specialCheck.src = hasSpecial ? valideImg : crossImg;
        chiffreCheck.src = hasChiffre ? valideImg : crossImg;
        lengthCheck.src = hasLength ? valideImg : crossImg;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        

        if (password !== confirmPassword) {
            return setError('Les mots de passe ne correspondent pas.');
        }

        const isPasswordValid = 
            /[A-Z]/.test(password) &&
            /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password) &&
            /[0-9]/.test(password) &&
            password.length >= 8; 

        if (!isPasswordValid) {
            return setError("Le mot de passe ne respecte pas tous les critères de sécurité.");
        }
        
        
        try {
            const response = await INSTANCE.post(URLS.RESET_PASSWORD, {
            resetToken: token,
            newPassword: password
        });
            setSuccess(response.data.message);

            setTimeout(() => {
                navigate('/login');
            }, 3000);

        } catch (err) {
            setError(err.response?.data?.message || 'Une erreur est survenue. Le lien est peut-être expiré.');
        }
    };

    return (
        <div className="reset-password-page">
            <div className="reset-password-container">
                
                {/* On affiche le message de succès OU le formulaire */}
                {success ? (
                    // --- VUE DE SUCCÈS ---
                    <div className="success-view">
                        <h1>Mot de passe modifié !</h1>
                        <p>{success}</p>
                        <p>Vous allez être redirigé vers la page de connexion...</p>
                    </div>
                ) : (
                    <>
                        <h1>Créer un nouveau mot de passe</h1>
                    <p>Choisissez un mot de passe sécurisé que vous n'utilisez pas sur d'autres sites.</p>
                    <form onSubmit={handleSubmit}>
                        {/* Champ Nouveau mot de passe */}
                        <div className="form-group">
                            <label htmlFor="newPassword">Nouveau mot de passe</label>
                            <div className="password-input-wrapper">
                                <input
                                    type={visibility.new ? 'text' : 'password'}
                                    id="newPassword"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onInput={checkPasswordStrength} 
                                    required
                                />
                                <img
                                    src={visibility.new ? "/closed-eye.svg" : "/eye.svg"}
                                    alt="Toggle visibility"
                                    className="password-toggle-icon"
                                    onClick={() => toggleVisibility('new')}
                                />
                            </div>
                        </div>

                        {/* --- ON AJOUTE LES INDICATEURS DE VALIDATION ICI --- */}
                        <div className="password-requirements">
                            <p>
                                <img id="maj-check" src="/croosing.svg" alt="check" />
                                Au moins une majuscule
                            </p>
                            <p>
                                <img id="special-check" src="/croosing.svg" alt="check" />
                                Au moins un caractère spécial
                            </p>
                            <p>
                                <img id="chiffre-check" src="/croosing.svg" alt="check" />
                                Au moins un chiffre
                            </p>
                            <p>
                                <img id="length-check" src="/croosing.svg" alt="check" />
                                Au moins 8 caractères 
                            </p>
                        </div>

                        {/* Champ Confirmer le nouveau mot de passe */}
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirmer le nouveau mot de passe</label>
                            <div className="password-input-wrapper">
                                <input
                                    type={visibility.confirm ? 'text' : 'password'}
                                    id="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                                <img
                                    src={visibility.confirm ? "/closed-eye.svg" : "/eye.svg"}
                                    alt="Toggle visibility"
                                    className="password-toggle-icon"
                                    onClick={() => toggleVisibility('confirm')}
                                />
                            </div>
                        </div>
                        
                        <button type="submit" className="submit-button">Modifier le mot de passe</button>
                    </form>
                    {error && <p className="error-message">{error}</p>}
                    </>
                )}
            </div>
        </div>
    );
};

export default Reset;