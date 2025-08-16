// Dans CommentForm.jsx
import React, { useState, useContext } from 'react';
import { Context } from '../../utils/context/Context';
import axios from 'axios';
import StarRating from './Star'; 

const CommentForm = ({ gameId, onCommentPosted }) => {
    const { auth } = useContext(Context);
    const [commentText, setCommentText] = useState('');
    const [userRating, setUserRating] = useState(0); // Nouvel état pour la note

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!commentText.trim() || !auth) return;

        // On inclut la note dans le commentaire
        const newComment = { 
            user: auth._id, 
            game: gameId, 
            content: commentText,
            rating: userRating // On ajoute la note !
        };

        try {
            const response = await axios.post('http://localhost:8000/game/comment/add', newComment);
            if (response.status === 201) {
                onCommentPosted(response.data);
                setCommentText('');
                setUserRating(0); // Réinitialise les étoiles
            }
        } catch (error) {
            console.error("Erreur lors de l'envoi du commentaire:", error);
        }
    };

    if (!auth) return null;

    return (
        <div className="comment-form-container">
            <img src={auth.avatar} alt="Avatar" className="user-avatar" referrerPolicy="no-referrer" />
            <form onSubmit={handleCommentSubmit} className="comment-form">
                
                {/* On ajoute le composant de notation ici */}
                <div className="rating-section">
                    <p>Mettre une Note :</p>
                    <StarRating onRatingChange={setUserRating} />
                </div>

                <textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Ajouter un commentaire..."
                    rows="1"
                />
                {(commentText || userRating > 0) && (
                    <div className="form-actions">
                        <button type="button" onClick={() => { setCommentText(''); setUserRating(0); }} className="cancel-button">Annuler</button>
                        <button type="submit" className="submit-button">Commenter</button>
                    </div>
                )}
            </form>
        </div>
    );
};

export default CommentForm;