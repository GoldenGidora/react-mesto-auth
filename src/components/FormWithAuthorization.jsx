const FormWithAuthorization = ({ title, buttonName }) => {
    return (
        <div className="auth">
            <h2 className="auth__title">{title}</h2>
            <form className="auth__form">
                <input type="email" placeholder="Email" required />
                <input type="password" min="8" placeholder="Password" required />
                <button type="submit">{buttonName}</button>
            </form>
        </div>
    );
};

export default FormWithAuthorization;