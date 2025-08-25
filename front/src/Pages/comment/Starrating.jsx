import React from 'react'
import './css/star.scss'
import { useState } from 'react';

const Starrating = () => {
        const [rating, setRating] = useState(0); // La note cliquée et sauvegardée
    const [hoverRating, setHoverRating] = useState(0); // La note en cours de survol

    const stars = [1, 2, 3, 4, 5];

    const handleMouseMove = (starIndex, event) => {
        const rect = event.target.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        // Si la souris est dans la première moitié de l'étoile, la note est .5
        if (mouseX < rect.width / 2) {
            setHoverRating(starIndex - 0.5);
        } else {
            setHoverRating(starIndex);
        }
    };

    const handleMouseLeave = () => {
        setHoverRating(0); // On réinitialise le survol quand la souris quitte
    };

    const handleClick = (starIndex) => {
        // La note finale est celle qui était survolée au moment du clic
        const newRating = hoverRating;
        setRating(newRating);
        onRatingChange(newRating); // On envoie la note au composant parent
    };
  return (
     <div className="star-rating-container" onMouseLeave={handleMouseLeave}>
            {stars.map(starIndex => {
                const displayRating = hoverRating > 0 ? hoverRating : rating;
                let iconClass = "fa-regular fa-star"; // Étoile vide par défaut

                if (displayRating >= starIndex) {
                    iconClass = "fa-solid fa-star"; // Étoile pleine
                } else if (displayRating >= starIndex - 0.5) {
                    iconClass = "fa-solid fa-star-half-stroke"; // Demi-étoile
                }

                return (
                    <i
                        key={starIndex}
                        className={`star-icon ${iconClass}`}
                        onMouseMove={(e) => handleMouseMove(starIndex, e)}
                        onClick={() => handleClick(starIndex)}
                    />
                );
            })}
        </div>
  )
}

export default Starrating
