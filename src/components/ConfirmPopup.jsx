import React from 'react';
import PopupWithForm from "./PopupWithForm";

const ConfirmPopup = ({isOpen, onClose, onLoading, card, onSubmit}) => {

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(card);
    }

    return (
        <PopupWithForm
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            name='confirm'
            title='Вы уверены?'
            submitText={onLoading ? 'Сохранение...' : 'Да'}
        />
    );
};

export default ConfirmPopup;