import EditButton from '../images/edit_button.svg';
import AddButton from '../images/add.svg';
import {useContext} from "react";
import Card from "./Card";
import {currentUserContext} from "../contexts/CurrentUserContext";

function Main(props) {
    const currentUser = useContext(currentUserContext);

    return (
        <main className="main">
            <section className="profile">
                <div className="profile__card">
                    <img src={currentUser.avatar} alt="аватар профиля" className="profile__avatar"/>
                    <button
                        className="profile__avatar-edit"
                        onClick={props.onEditAvatar}
                    />
                    <div className="profile__info">
                        <div className="profile__user">
                            <h1 className="profile__title">{currentUser.name}</h1>
                            <button
                                type="button"
                                className="profile__button profile__button_type_edit"
                                onClick={props.onEditProfile}
                            >
                                <img src={EditButton} className="image image_type_edit"
                                     alt="Редактировать профиль"/>
                            </button>
                        </div>
                        <p className="profile__text">{currentUser.about}</p>
                    </div>
                </div>
                <button
                    type="button"
                    className="profile__button profile__button_type_add"
                    onClick={props.onAddPlace}
                >
                    <img src={AddButton} className="image image_type_add" alt="Добавить пост"/>
                </button>
            </section>
            <section className="cards">
                {props.cards.map(card => {
                    return <Card
                        key={card._id}
                        card={card}
                        onCardClick={props.onCardClick}
                        onCardLike={props.onCardLike}
                        onCardDelete={props.onCardDeleteClick}
                    />
                })}

            </section>
        </main>
    )
}

export default Main;