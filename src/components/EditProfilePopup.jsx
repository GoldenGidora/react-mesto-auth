import {useState, useContext, useEffect} from 'react';
import PopupWithForm from "./PopupWithForm";
import {currentUserContext} from '../contexts/CurrentUserContext';

const EditProfilePopup = ({isOpen, onClose, onUpdateUser, isLoading}) => {
    const currentUser = useContext(currentUserContext)
    const [name, setName] = useState('');
    const [about, setAbout] = useState('');

    const handleNameChange = (e) => {
        setName(e.target.value);
    }
    const handleDescriptionChange = (e) => {
        setAbout(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdateUser({
            name,
            about
        })
    }

    useEffect(() => {
        setName(currentUser.name);
        setAbout(currentUser.about);
    }, [currentUser, isOpen]);

    return (
        <PopupWithForm
            name='edit'
            title='Редактировать профиль'
            submitText={isLoading ? 'Сохранение...' : 'Сохранить'}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <label className="popup__field">
                <input
                    id="username-input"
                    name="name"
                    type="text"
                    placeholder="Введите имя"
                    className="popup__input popup__input_type_name"
                    minLength="2"
                    maxLength="40"
                    value={name || ''}
                    /* Вопрос к ревьюеру:
                    Если в 48 строке убрать || '', то реакт будет ругаться, что управляемый инпут становится uncontrolled
                    Правильно ли я понимаю, что это связано с контекстом currentUser
                    Из-за того что на 25 строке мы используем хук useEffect, который реагирует на изменения currentUser и по дефолту берёт значения оттуда при монтировании
                    Следовательно у нас name (как и about) может оказаться undefined если из api не придёт объект (или пустой объект)
                    И следовательно мы тут должны добавить "защиту" в виде || '', чтобы не было value=undefined ?
                     */
                    onChange={handleNameChange}
                    required
                />
                <span className="popup__input-error username-input-error"></span>
            </label>
            <label className="popup__field">
                <input
                    id="user-desc-input"
                    name="about"
                    type="text"
                    placeholder="Введите описание"
                    className="popup__input popup__input_type_description"
                    minLength="2"
                    maxLength="200"
                    value={about || ''}
                    onChange={handleDescriptionChange}
                    required
                />
                <span className="popup__input-error user-desc-input-error"></span>
            </label>
        </PopupWithForm>
    );
};

export default EditProfilePopup;