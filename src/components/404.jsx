import { Link } from 'react-router-dom';
import Bye from '../images/404.jpg';
import './404.css';
function PageNotFound () {
    return (
        <div className="not-found">
            <img className="not-found__image" src={Bye} alt=""/>
            <p className="not-found__text">
                Ой, здесь ничего нет
            </p>
            <Link className="popup__submit" to="/">Назад</Link>
        </div>
    )
}

export default PageNotFound;