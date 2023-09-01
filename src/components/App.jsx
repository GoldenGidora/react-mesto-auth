import '../pages/index.css';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import {currentUserContext} from "../contexts/CurrentUserContext";
import {useState, useEffect} from 'react';
import api from "../utils/Api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmPopup from "./ConfirmPopup";
import {Routes, useNavigate, Route} from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import * as auth from "../utils/Auth";
import InfoTooltip from "./InfoTooltip";

function App() {
    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
    const [isConfirmPopupOpen, setConfirmPopupOpen] = useState(false);
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [selectedCard, setSelectedCard] = useState({});
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);
    const [removeCard, setRemoveCard] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [isRegistrationSuccessful, setIsRegistrationSuccessful] = useState(false);
    const [authorizationEmail, setAuthorizationEmail] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        Promise.all([api.getUserInfo(), api.getCards()])
            .then(([user, cards]) => {
                setCurrentUser(user);
                setCards(cards);
            })
            .catch(e => console.log(e))
    }, []);

    const closeAllPopups = () => {
        setEditAvatarPopupOpen(false);
        setAddPlacePopupOpen(false);
        setEditProfilePopupOpen(false);
        setConfirmPopupOpen(false);
        setSelectedCard({});
    }

    const handleAddPlaceClick = () => {
        setAddPlacePopupOpen(true);
    }

    const handleEditAvatarClick = () => {
        setEditAvatarPopupOpen(true);
    }

    const handleEditProfileClick = () => {
        setEditProfilePopupOpen(true);
    }

    const handleCardClick = card => {
        setSelectedCard(card);
    }

    const handleCardDeleteClick = card => {
        setConfirmPopupOpen(true);
        setRemoveCard(card);
    }

    const handleCardLike = card => {
        const isLiked = card.likes.some(
            i => i._id === currentUser._id
        );
        api.changeLikeCardStatus(card._id, isLiked)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch(e => console.log(e));
    }

    const handleCardDelete = card => {
        setIsLoading(true);
        api.removeCard(card._id)
            .then(() => {
                setCards(cards.filter((item) => {
                    return item._id !== card._id;
                }));
                closeAllPopups();
            })
            .catch(e => console.log(e))
            .finally(() => setIsLoading(false));
    }

    const handleUpdateUser = userInfo => {
        setIsLoading(true);
        api.setUserInfo(userInfo)
            .then((user) => {
                setCurrentUser(user);
                closeAllPopups();
            })
            .catch(e => console.log(e))
            .finally(() => setIsLoading(false))
    }

    const handleUpdateAvatar = (newData) => {
        setIsLoading(true);
        api.editAvatar(newData)
            .then((data) => {
                setCurrentUser(data);
                closeAllPopups();
            })
            .catch(e => console.log(e))
            .finally(() => setIsLoading(false));
    }

    const handleAddPlace = (newData) => {
        setIsLoading(true);
        api.addCard(newData)
            .then(newCard => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch(e => console.log(e))
            .finally(() => setIsLoading(false))
    }

    return (
        <currentUserContext.Provider value={currentUser}>
            <div className="page">
                <Header/>
                <Routes>
                    <Route
                        path='/'
                        element={
                            <ProtectedRoute
                                element={Main}
                                loggedIn={loggedIn}
                                onEditProfile={handleEditProfileClick}
                                onAddPlace={handleAddPlaceClick}
                                onEditAvatar={handleEditAvatarClick}
                                onCardClick={handleCardClick}
                                onCardLike={handleCardLike}
                                onCardDeleteClick={handleCardDeleteClick}
                                cards={cards}
                            />
                        }
                    />
                    <Route path="/sign-in"
                           element={
                               <Login/>
                           }
                    />
                    <Route path="/sign-up"
                           element={
                               <Register/>
                           }
                    />
                </Routes>
                <Footer/>
                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                    onLoading={isLoading}
                />
                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddPlace}
                    onLoading={isLoading}
                />
                <ConfirmPopup
                    onLoading={isLoading}
                    isOpen={isConfirmPopupOpen}
                    onClose={closeAllPopups}
                    onSubmit={handleCardDelete}
                    card={removeCard}
                />
                <ImagePopup
                    card={selectedCard}
                    onClose={closeAllPopups}
                />
                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                    onLoading={isLoading}
                />
                <InfoTooltip
                    isOpen={isInfoTooltipOpen}
                    onClose={closeAllPopups}
                    isSuccess={isRegistrationSuccessful}
                />
            </div>
        </currentUserContext.Provider>
    )
        ;
}

export default App;
