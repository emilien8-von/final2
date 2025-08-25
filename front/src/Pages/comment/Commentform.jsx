import React from 'react'
import { Context } from '../../utils/context/Context';
import URLS from '../../utils/constants/URLS'
import INSTANCE from '../../utils/services/instance'
import Starrating from './Starrating';
import { useContext,useState } from 'react';
const Commentform = ({ gameId, onCommentPosted }) => {
    const { auth } = useContext(Context);
    const [commentText, setCommentText] = useState('');
    const [userRating, setUserRating] = useState(0);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!commentText.trim() || !auth) return;

        const newComment = { 
            user: auth._id, 
            game: gameId, 
            content: commentText,
            rating: userRating
        };

        try {
            // 2. Assurez-vous que votre appel API est correct
            const response = await INSTANCE.post(URLS.POST_COMMENT, newComment);
            if (response.status === 201) {
                onCommentPosted(response.data);
                setCommentText('');
                setUserRating(0);
            }
        } catch (error) {
            console.error("Erreur lors de l'envoi du commentaire:", error);
        }
    };

    if (!auth) return null
  return (
     <div className="comment-form-container">
            <img src={auth.avatar} alt="Avatar" className="user-avatar" referrerPolicy="no-referrer" />
            <form onSubmit={handleCommentSubmit} className="comment-form">
                
                {/* On ajoute le composant de notation ici */}
                <div className="rating-section">
                    <p>Mettre une Note :</p>
                    <Starrating onRatingChange={setUserRating} />
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
  )
}

export default Commentform
