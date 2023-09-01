import logo from "../images/logo.svg";
import {Link, Route, Routes} from "react-router-dom";
function Header({loggedIn, userEmail, onSignOut}) {

    const signOut = (e) => {
        onSignOut(e);
    }

    return (
        <header className="header">
            <img src={logo} alt="логотип" className="header__logo"/>
            {loggedIn && (
                <nav className="header__nav">
                    <span>{userEmail}</span>
                    <button className="header__sign-out" onClick={signOut}>
                        Выйти
                    </button>
                </nav>
            )}
            <Routes>
                <Route exact path=':sign-in'
                       element={
                           <Link to='/sign-up' className='header__link'>Регистрация</Link>
                       }
                />
                <Route exact path=':sign-up'
                       element={
                           <Link to='/sign-in' className='header__link'>Войти</Link>
                       }
                />
            </Routes>
        </header>
    )
}

export default Header