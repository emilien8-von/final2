// Dans Comments.jsx
import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../utils/context/Context';
import INSTANCE from '../utils/services/instance'
import URLS from '../utils/constants/URLS'
import CommentForm from './comment/Commentform'; 
import CommentList from './comment/Commentlist'; 
import Star from './comment/Star';
import './css/comment.scss';

const Comments = ({ gameId }) => { // Renommé en gameId pour plus de clarté
    const { auth } = useContext(Context);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchComments = async () => {
            if (!gameId) return;
            try {
                setLoading(true);
                const response = await INSTANCE.get(`${URLS.GET_COMMENT_BY_ID}/${id}`);
                if (Array.isArray(response.data)) {
                    setComments(response.data);
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des commentaires:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchComments();
    }, [gameId]);

    const handleNewComment = (newComment) => {
        setComments(prevComments => [newComment, ...prevComments]);
    };

    return (
        <div className="comment-section">
            <h3>Commentaires</h3>
            
            {/* Si l'utilisateur n'est pas connecté, on affiche un message */}
            {!auth && (
                <div className="comment-section-login-prompt">
                    <p>Veuillez vous <a href="/login">connecter</a> pour laisser un commentaire.</p>
                </div>
            )}
            
            {/* Le formulaire est affiché et reçoit la fonction pour se mettre à jour */}
            <CommentForm gameId={gameId} onCommentPosted={handleNewComment} />

            <hr className='form-separator' />
            
            {/* La liste des commentaires est affichée */}
            {loading ? <p>Chargement des commentaires...</p> : <CommentList comments={comments} />}
        </div>
    );
};

export default Comments;