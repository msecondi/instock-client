import './hero.scss';
import Button from '../Button/Button';

function Hero() {
    return (
        <section className="hero">
            <h1 className="hero__title">Warehouses</h1>
            <div className="hero__controls">
                <input className="hero__search" type="text" placeholder="Search" /> 
                <Button buttonText="+ Add New Warehouse" />
            </div>
        </section>
    );
}

export default Hero;