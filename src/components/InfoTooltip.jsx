import successIcon from '../images/success-icon.svg';
import unsuccessIcon from '../images/unsuccess-icon.svg';
import React from 'react';

const InfoTooltip = ({isOpen, onClose, isSuccess}) => {
    return (
        <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container popup__success">
                <button type="button" className="popup__close" onClick={onClose}/>
                <img
                    src={isSuccess ? successIcon : unsuccessIcon}
                    alt={
                        isSuccess ? 'Регистрация прошла успешно' : 'Регистрация не прошла'
                    }
                    className="popup__signup-icon"
                />
                <h2 className="popup__signup-title">
                    {isSuccess
                        ? 'Вы успешно зарегистрировались!'
                        : 'Что-то пошло не так! Попробуйте ещё раз.'}
                </h2>
            </div>
        </div>
    );
};

export default InfoTooltip;