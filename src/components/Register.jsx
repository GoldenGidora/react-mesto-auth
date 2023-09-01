import { useState } from 'react';
import FormWithAuthorization from "./FormWithAuthorization";

import * as auth from '../utils/Auth';
import {useNavigate} from "react-router-dom";

const Register = (props) => {

    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = userData;
        auth.register(email, password).then((res) => {
            if (res.ok) {
                props.history.push('/sign-in');
            }
        });
    };

    return (
        <>
            <FormWithAuthorization title="Регистрация" buttonName="Зарегистрироваться"/>
            <p className="auth__login-hint">Уже зарегистрированы? Войти</p>
        </>
    );
};

export default Register;