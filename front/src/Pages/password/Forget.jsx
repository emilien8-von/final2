import React from 'react'
import './css/forgot.scss'
import { useState } from 'react';
import { useNavigate } from 'react-router';
import INSTANCE from "../services/instance";
import URLS from '../../utils/constants/URLS.JS';

const Forget = () => {
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [step, setStep] = useState(1); // 1 = Saisir email, 2 = Saisir code
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Hook pour la redirection

    // Étape 1 : Demander le code
    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await INSTANCE.get(`${URLS.FORGOT_PASSWORD}`, { email });
            setStep(2); // On passe à l'étape suivante
            setMessage(`Un code de vérification a été envoyé à ${email}.`);
        } catch (err) {
            setError(err.response?.data?.message || 'Une erreur est survenue.');
        }
    };

const handleCodeSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
        // LA CORRECTION EST ICI : Assurez-vous que c'est bien axios.post
        const response = await INSTANCE.get(`${URLS.VERIFY_RESET_CODE}`, { 
            email: email,
            code: code
        });
        
        const { resetToken } = response.data;
        navigate(`/reset-password/${resetToken}`);

    } catch (err) {
        setError(err.response?.data?.message || 'Code invalide ou expiré. Veuillez réessayer.');
    }
};
  return (
     <div className="forgot-password-page">
            <div className="forgot-password-container">
                {step === 1 ? (
                    // --- FORMULAIRE ÉTAPE 1 : EMAIL ---
                    <>
                        <h1>Mot de passe oublié ?</h1>
                        <p>Entrez votre adresse email et nous vous enverrons un code pour réinitialiser votre mot de passe.</p>
                        <form onSubmit={handleEmailSubmit}>
                            <div className="form-group">
                                <label htmlFor="email">Adresse email</label>
                                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            </div>
                            <button type="submit" className="submit-button">Envoyer le code</button>
                        </form>
                    </>
                ) : (
                    // --- FORMULAIRE ÉTAPE 2 : CODE ---
                    <>
                        <h1>Vérifiez votre boîte mail</h1>
                        <p>{message}</p>
                        <form onSubmit={handleCodeSubmit}>
                            <div className="form-group">
                                <label htmlFor="code">Saisir le code</label>
                                <input type="text" id="code" value={code} onChange={(e) => setCode(e.target.value)} required />
                            </div>
                            <button type="submit" className="submit-button">Valider</button>
                        </form>
                        <button onClick={handleEmailSubmit} className="resend-button">Renvoyer le code</button>
                    </>
                )}
                {error && <p className="error-message">{error}</p>}
            </div>
        </div>
  )
}

export default Forget
