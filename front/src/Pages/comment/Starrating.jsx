// Dans Starrating.jsx
import React, { useState } from 'react';
import './css/star.scss'; 

const Starrating = ({ onRatingChange }) => {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);

    const stars = [1, 2, 3, 4, 5];

    const handleMouseMove = (starValue, event) => {
        const rect = event.target.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        if (mouseX < rect.width / 2) {
            setHoverRating(starValue - 0.5);
        } else {
            setHoverRating(starValue);
        }
    };

    const handleMouseLeave = () => {
        setHoverRating(0);
    };

    const handleClick = () => {
        const newRating = hoverRating;
        setRating(newRating);
        onRatingChange(newRating); 
    };

    return (
        <div className="star-rating-container" onMouseLeave={handleMouseLeave}>
            {stars.map(starValue => {
                const displayRating = hoverRating > 0 ? hoverRating : rating;
                let iconClass = "fa-regular fa-star";

                if (displayRating >= starValue) {
                    iconClass = "fa-solid fa-star"; 
                } else if (displayRating >= starValue - 0.5) {
                    iconClass = "fa-solid fa-star-half-stroke"; 
                }

                return (
                    <i
                        key={starValue}
                        className={`star-icon ${iconClass}`}
                        onMouseMove={(e) => handleMouseMove(starValue, e)}
                        onClick={handleClick}
                    />
                );
            })}
        </div>
    );
};

export default Starrating;