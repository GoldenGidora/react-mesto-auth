import logo from "../images/logo.svg";
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
        </header>
    )
}

export default Header