import {useRef, useEffect} from 'react';
import PopupWithForm from "./PopupWithForm";

const EditAvatarPopup = ({isOpen, onClose, onUpdateAvatar, onLoading}) => {
    const inputRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdateAvatar({
            avatar: inputRef.current.value
        })
    }

    useEffect(() => {
        inputRef.current.value = '';
    }, [isOpen])

    return (
        <PopupWithForm
            name='avatar'
            title='Обновить аватар'
            submitText={onLoading ? 'Сохранение...' : 'Сохранить'}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <label className="popup__field">
                <input
                    ref={inputRef}
                    id="avatar-input"
                    name="avatar"
                    type="url"
                    placeholder="Вставьте ссылку"
                    className="popup__input popup__input_type_link"
                    required
                />
                <span className="popup__input-error avatar-input-error"></span>
            </label>
        </PopupWithForm>
    );
};

export default EditAvatarPopup;