import './hero.scss';
import Button from '../Button/Button';
import SearchIcon from '../../assets/icons/search-24px.svg';

function Hero({onClick}) {
    return (
        <section className="hero">
            <h1 className="hero__title">Warehouses</h1>
            <div className="hero__controls">
                <div className="hero__search-box hero__search-box--right-margin">
                    <input className="hero__search-input" type="text" placeholder="Search..." /> 
                    <button className="hero__search-button">
                        <img className="hero__search-icon" src={SearchIcon} alt="Search Icon" />
                    </button>
                </div>
                <Button buttonText="+ Add New Warehouse" onClick={onClick} />
            </div>
        </section>
    );
}

export default Hero;