function ImagePopup({card, onClose}) {
    return (
        <div className={`popup popup_type_image ${card.link ? "popup_opened" : ""}`}>
            <div className="popup__image-container">
                <img
                    src={card.link}
                    className="popup__image"
                    alt={card.name}
                />
                <p className="popup__figcaption">{card.name}</p>
                <button type="button" id="CloseImage" className="popup__close" onClick={onClose}></button>
            </div>
        </div>
    )
}

export default ImagePopup;