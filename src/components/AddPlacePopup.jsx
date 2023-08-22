import React, {useEffect} from 'react';
import PopupWithForm from "./PopupWithForm";

const AddPlacePopup = ({isOpen, onClose, onAddPlace, onLoading}) => {
    const [image, setImage] = React.useState('');
    const [link, setLink] = React.useState('');

    const onImageNameChange = e => {
        setImage(e.target.value);
    }

    const onLinkChange = e => {
        setLink(e.target.value);
    }

    const handleAddPlaceSubmit = e => {
        e.preventDefault();
        onAddPlace({
            name: image,
            link
        })
    }

    useEffect(() => {
        setImage('');
        setLink('');
    }, [isOpen])

    return (
        <PopupWithForm
            name='add'
            title='Новое место'
            submitText={onLoading ? 'Сохранение...' : 'Сохранить'}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleAddPlaceSubmit}
        >
            <label className="popup__field">
                <input
                    id="postTitle-input"
                    name="name"
                    type="text"
                    placeholder="Название"
                    className="popup__input popup__input_type_place"
                    minLength="2"
                    maxLength="30"
                    onChange={onImageNameChange}
                    value={image}
                    required
                />
                <span className="popup__input-error postTitle-input-error"></span>
            </label>
            <label className="popup__field">
                <input
                    id="postUrl-input"
                    name="link"
                    type="url"
                    placeholder="Ссылка на картинку"
                    className="popup__input popup__input_type_link"
                    onChange={onLinkChange}
                    value={link}
                    required
                />
                <span className="popup__input-error postUrl-input-error"></span>
            </label>
        </PopupWithForm>
    );
};

export default AddPlacePopup;