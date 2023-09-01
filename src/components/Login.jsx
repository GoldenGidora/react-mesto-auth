import {useState} from "react";

const Login = ({onLogin}) => {
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
        if (!formData.email || !formData.password) {
            return;
        }
        onLogin(formData);
    };


    return (
        <>
            <div className="auth">
                <h2 className="auth__title">Вход</h2>
                <form className="auth__form" onSubmit={handleSubmit}>
                    <input
                        onChange={handleChange}
                        value={formData.email}
                        name='email'
                        type="email"
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
                    <button type="submit">Войти</button>
                </form>
            </div>
        </>
    )
};

export default Login;