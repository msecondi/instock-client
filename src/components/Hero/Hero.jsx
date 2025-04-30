import './hero.scss';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import SearchFormField from '../SearchFormField/SearchFormField';

function Hero({dataToRender, handleClick, buttonText, addButtonUrl}) {
    const heroTitle = dataToRender[0]?.warehouse_id ? 'Inventory' : 'Warehouses';

    return (
        <section className="hero">
            <h1 className="hero__title">{heroTitle}</h1>
            <div className="hero__controls">
                <SearchFormField searchContext={dataToRender} handleClick={handleClick}/>
                <Link className="hero__link" to={addButtonUrl}>
                    <Button buttonText={buttonText} />
                </Link>
            </div>
        </section>
    );
}

export default Hero;