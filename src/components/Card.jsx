import {useContext} from "react";
import {currentUserContext} from "../contexts/CurrentUserContext";

const Card = ({card, onCardClick, onCardLike, onCardDelete}) => {
    const currentUser = useContext(currentUserContext);
    const handleCardClick = () => {
        onCardClick(card);
    }

    const handleLikeClick = () => {
        onCardLike(card);
    }
    const handleDeleteClick = () => {
        onCardDelete(card);
    }

    const isLiked = card.likes.some(i => i._id === currentUser._id);

    return (
        <div className="cards__item">
            {card.owner._id === currentUser._id &&
                <button type="button" className='cards__delete' onClick={handleDeleteClick}></button>
            }
            <img className="cards__img"
                 src={card.link}
                 alt={card.name}
                 onClick={handleCardClick}
            />
            <div className="cards__info">
                <h2 className="cards__title">{card.name}</h2>
                <div className="cards__likes">
                    <button type="button" className={"cards__like" + (isLiked ? ' cards__like_active' : '')}
                            onClick={handleLikeClick}></button>
                    <span className="cards__like-number"> {card.likes.length} </span>
                </div>
            </div>
        </div>
    )
}

export default Card;