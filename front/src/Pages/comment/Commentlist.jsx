// Dans CommentList.jsx (notez le 'L' majuscule)
import React from 'react';

// On accepte la liste des commentaires comme une prop
const CommentList = ({ comments }) => {
    if (!comments || comments.length === 0) {
        return <p className="no-comments-message">Soyez le premier à commenter !</p>;
    }

    return (
        <div className="comments-list">
            {comments.map(comment => (
                <div key={comment._id} className="comment-item">
                    {comment.user && comment.user.avatar && (
                        <img 
                            src={comment.user.avatar} 
                            alt={`Avatar de ${comment.user.pseudo}`} 
                            className="user-avatar" 
                            referrerPolicy="no-referrer" 
                        />
                    )}
                    <div className="comment-content">
                        <p className="comment-author">{comment.user ? comment.user.pseudo : "Utilisateur Anonyme"}</p>
                        
                        {comment.rating > 0 && (
                            <div className="comment-rating-display">
                                {[...Array(5)].map((star, index) => (
                                    <i 
                                      key={index} 
                                      className="fa-solid fa-star" 
                                      style={{ color: index < comment.rating ? '#ffc107' : '#e4e5e9', fontSize: '0.8rem' }}
                                    ></i>
                                ))}
                            </div>
                        )}
                        <p className="comment-text">{comment.content}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CommentList;