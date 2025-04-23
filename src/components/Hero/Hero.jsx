import './hero.scss';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import SearchIcon from '../../assets/icons/search-24px.svg';
import SearchFormField from '../SearchFormField/SearchFormField';

function Hero({onClick, heroTitle, buttonText, addButtonUrl}) {
    return (
        <section className="hero">
            <h1 className="hero__title">{heroTitle}</h1>
            <div className="hero__controls">
                <SearchFormField />
                <Link className="hero__link" to={addButtonUrl}>
                    <Button buttonText={buttonText} />
                </Link>
            </div>
        </section>
    );
}

export default Hero;