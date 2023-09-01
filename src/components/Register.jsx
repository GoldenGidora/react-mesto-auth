import {useState} from 'react';
import {Link} from "react-router-dom";

const Register = ({onRegister}) => {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onRegister(formData)
    };

    return (
        <>
            <div className="auth">
                <h2 className="auth__title">Регистрация</h2>
                <form className="auth__form" onSubmit={handleSubmit}>
                    <input
                        onChange={handleChange}
                        value={formData.email}
                        type="email"
                        name='email'
                        placeholder="Email"
                        required
                    />
                    <input
                        onChange={handleChange}
                        value={formData.password}
                        type="password"
                        name='password'
                        min="8"
                        placeholder="Password"
                        required/>
                    <button type="submit">Зарегистрироваться</button>
                    <Link to="/sign-in" className="auth__login-hint">
                        Уже зарегистрированы? Войти
                    </Link>
                </form>
            </div>
        </>
    );
};

export default Register;