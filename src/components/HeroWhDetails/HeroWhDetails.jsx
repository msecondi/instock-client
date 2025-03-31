import './heroWhDetails.scss';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import EditIcon from '../../assets/icons/edit-white-24px.svg';
import BackIcon from '../../assets/icons/arrow_back-24px.svg';

function HeroWhDetails({heroTitle, id}) {
    return (
        <section className="hero">
            <div className="hero__heading">
                <Link className="hero__link hero__link--heading" to="/">
                    <img className="hero__back-icon" src={BackIcon} alt="Back Icon" />
                    <h1 className="hero__title">{heroTitle ?? 'Warehouse Name not Found'}</h1>
                </Link>
            </div>
            <div className="hero__controls">
                <Link className="hero__link" to={`/warehouses/${id}/edit`}>
                    <Button buttonText="Edit" imgSrc={EditIcon}/>
                </Link>
            </div>
        </section>
    );
}

export default HeroWhDetails;