import React from "react";

function PopupWithForm({name, title, isOpen, submitText, onClose, children, onSubmit}) {

    return (
        <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}>
            <div className="popup__container">
                <h2 className="popup__title">{title}</h2>
                <form
                    className="form"
                    name={`${name}`}
                    action="#"
                    onSubmit={onSubmit}
                >
                    {children}
                    <button type="submit" className="popup__submit">{submitText}</button>
                </form>
                <button type="button" className="popup__close" onClick={onClose}/>
            </div>
        </div>
    )
}

export default PopupWithForm;