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
    const [userEmail, setUserEmail] = useState('');

    const [selectedCard, setSelectedCard] = useState({});
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);
    const [removeCard, setRemoveCard] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [isTooltipInfoSuccess, setIsTooltipInfoSuccess] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (loggedIn) {
            Promise.all([api.getUserInfo(), api.getCards()])
                .then(([user, cards]) => {
                    setCurrentUser(user);
                    setCards(cards);
                })
                .catch(e => console.log(e))
        }
    }, [loggedIn]);

    useEffect(() => {
        checkToken();
    }, []);

    const closeAllPopups = () => {
        setEditAvatarPopupOpen(false);
        setAddPlacePopupOpen(false);
        setEditProfilePopupOpen(false);
        setConfirmPopupOpen(false);
        setSelectedCard({});
        setIsInfoTooltipOpen(false);
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

    const handleRegistration = (formData) => {
        const {email, password} = formData;
        return auth.register(email, password)
            .then(() => {
                setIsTooltipInfoSuccess(true)
                setIsInfoTooltipOpen(true);
                navigate('/sign-in')
            })
            .catch(e => {
                console.log(e);
                setIsTooltipInfoSuccess(false);
                setIsInfoTooltipOpen(true);
            })
    }

    const handleAuthoriztaionSuccess = (formData) => {
        const {email, password} = formData;
        return auth.authorization(email, password)
            .then((res) => {
                setUserEmail(email);
                localStorage.setItem('jwt', res.token)
                setLoggedIn(true);
                navigate('/');
            })
            .catch(e => {
                if (e.statusCode === 400) {
                    console.log('Не передано одно из полей');
                } else if (e.statusCode === 401) {
                    console.log('Пользователь с email не найден');
                }
                setIsInfoTooltipOpen(true);
                setIsTooltipInfoSuccess(false);
            })
    }

    const checkToken = () => {
        const jwt = localStorage.getItem('jwt');
        if (!jwt) {
            setLoggedIn(false);
            return;
        }
        auth.getContent(jwt)
            .then(data => {
                if (data) {
                    setLoggedIn(true);
                    setUserEmail(data.data.email);
                    navigate('/');
                } else {
                    setLoggedIn(false)
                }
            })
            .catch(e => console.log(e));
    }

    const handleSignOut = () => {
        setLoggedIn(false);
        localStorage.removeItem('jwt');
        navigate('/sign-in');
    };

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
                <Header
                    loggedIn={loggedIn}
                    userEmail={userEmail}
                    onSignOut={handleSignOut}
                />
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
                    <Route
                        path="/sign-in"
                        element={
                            <Login onLogin={handleAuthoriztaionSuccess}/>
                        }
                    />
                    <Route
                        path="/sign-up"
                        element={
                            <Register onRegister={handleRegistration}/>
                        }
                    />
                </Routes>
                <Footer/>
                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                    isLoading={isLoading}
                />
                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddPlace}
                    isLoading={isLoading}
                />
                <ConfirmPopup
                    isLoading={isLoading}
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
                    isSuccess={isTooltipInfoSuccess}
                />
            </div>
        </currentUserContext.Provider>
    )
        ;
}

export default App;
