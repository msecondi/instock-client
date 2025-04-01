import './heroWhDetails.scss';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import EditIcon from '../../assets/icons/edit-white-24px.svg';
import BackIcon from '../../assets/icons/arrow_back-24px.svg';

function HeroWhDetails({heroTitle, id}) {
    return (
        <section className="hero-wh-details">
            <div className="hero-wh-details__heading">
                <Link className="hero-wh-details__link hero-wh-details__link--heading" to="/">
                    <img className="hero-wh-details__back-icon" src={BackIcon} alt="Back Icon" />
                    <h1 className="hero-wh-details__title">{heroTitle ?? 'Warehouse Name not Found'}</h1>
                </Link>
            </div>
            <div className="hero-wh-details__controls">
                <Link className="hero-wh-details__link" to={`/warehouses/${id}/edit`}>
                    <Button buttonText="Edit" imgSrc={EditIcon}/>
                </Link>
            </div>
        </section>
    );
}

export default HeroWhDetails;