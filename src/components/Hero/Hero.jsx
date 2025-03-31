import './hero.scss';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import SearchIcon from '../../assets/icons/search-24px.svg';

function Hero({onClick, heroTitle, buttonText}) {
    return (
        <section className="hero">
            <h1 className="hero__title">{heroTitle}</h1>
            <div className="hero__controls">
                <div className="hero__search-box hero__search-box--right-margin">
                    <input className="hero__search-input" type="text" placeholder="Search..." /> 
                    <button className="hero__search-button">
                        <img className="hero__search-icon" src={SearchIcon} alt="Search Icon" />
                    </button>
                </div>
                <Link className="hero__link" to="/warehouses/add">
                    <Button buttonText={buttonText} />
                </Link>
            </div>
        </section>
    );
}

export default Hero;