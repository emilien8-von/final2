import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../../utils/context/Context';
import INSTANCE from '../../utils/services/instance';
import URLS from '../../utils/constants/URLS';
import CommentList from './Commentlist';
import Commentform from './Commentform';
import './css/comment.scss'
const Section = ({ gameId }) => {
    const { auth } = useContext(Context);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

    const fetchComments = async () => {
        if (!gameId) {
            setLoading(false);
            return;
        }
        
        try {
            setLoading(true);
            const response = await INSTANCE.get(`${URLS.GET_COMMENT_BY_GAME_ID}/${gameId}`);
            
            // On ne met à jour l'état que si le composant est toujours "monté"
            if (isMounted && Array.isArray(response.data)) {
                setComments(response.data);
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des commentaires:", error);
        } finally {
            if (isMounted) {
                setLoading(false);
            }
        }
    };

    fetchComments();

    // Fonction de nettoyage : s'exécute quand le composant est sur le point d'être démonté
    return () => {
        isMounted = false;
    };
}, [gameId]);


    const handleNewComment = (newComment) => {
        setComments(prevComments => [newComment, ...prevComments]);
    }

  return (
       <div className="comment-section">
            {/* Si l'utilisateur n'est pas connecté, on affiche un message */}
            {!auth && (
                <div className="comment-section-login-prompt">
                    <p>Veuillez vous <a href="/login">connecter</a> pour laisser un commentaire.</p>
                </div>
            )}
            
            <Commentform gameId={gameId} onCommentPosted={handleNewComment} />
            
            <hr className='form-separator' />
            {/* La liste des commentaires est affichée */}
            {loading ? <p>Chargement des commentaires...</p> : <CommentList comments={comments} />}
        </div>
  )
}

export default Section
