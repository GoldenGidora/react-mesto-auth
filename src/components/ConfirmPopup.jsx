import React from 'react';
import PopupWithForm from "./PopupWithForm";

const ConfirmPopup = ({isOpen, onClose, isLoading, card, onSubmit}) => {

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
            submitText={isLoading ? 'Сохранение...' : 'Да'}
        />
    );
};

export default ConfirmPopup;