import React from 'react';

const CommentList = ({ comments }) => {
    if (!comments || comments.length === 0) {
        return null; 
    }

    return (
        <div className="comments-list">
            {comments.map(comment => {
                if (!comment.user) {
                    return null;
                }

                return (
                    <div key={comment._id} className="comment-item">
                        <img 
                            src={comment.user.avatar} 
                            alt={`Avatar de ${comment.user.pseudo}`} 
                            className="user-avatar" 
                            referrerPolicy="no-referrer" 
                        />
                        <div className="comment-content">
                            <p className="comment-author">{comment.user.pseudo}</p>
                            
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
                );
            })}
        </div>
    );
};

export default CommentList;