import { useState } from 'react';
import FormWithAuthorization from "./FormWithAuthorization";

const Register = () => {

    const [userData, setUserData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserData({
            [name]: value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    return (
        <>
            <FormWithAuthorization title="Регистрация" buttonName="Зарегистрироваться"/>
            <p className="auth__login-hint">Уже зарегистрированы? Войти</p>
        </>
    );
};

export default Register;