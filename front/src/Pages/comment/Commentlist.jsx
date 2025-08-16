import React from 'react'

const Commentlist = () => {
  return (
    // ...
<div className="comment-content">
    <p className="comment-author">{comment.user ? comment.user.pseudo : "Utilisateur Anonyme"}</p>
    
    {/* AFFICHER LA NOTE DU COMMENTAIRE */}
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
// ...
  )
}

export default Commentlist
