import './HeroInvDetails.scss';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../Button/Button';
import EditIcon from '../../assets/Icons/edit-white-24px.svg';
import BackIcon from '../../assets/Icons/arrow_back-24px.svg';

function HeroInvDetails({heroTitle, id}) {
    
    const navigate = useNavigate();
    function goBack() {
        navigate(-1);
    }

    return (
        <section className="hero-inv-details">
            <div className="hero-inv-details__heading">
                <div className="hero-inv-details__link hero-inv-details__link--heading">
                    <img className="hero-inv-details__back-icon" src={BackIcon} alt="Back Icon" onClick={goBack}/>
                    <h1 className="hero-inv-details__title">{heroTitle ?? 'Inventory Item not Found'}</h1>
                </div>
            </div>
            <div className="hero-inv-details__controls">
                <Link className="hero-inv-details__link" to={`/inventories/${id}/edit`}>
                    <Button buttonText="Edit" imgSrc={EditIcon}/>
                </Link>
            </div>
        </section>
    );
}

export default HeroInvDetails;