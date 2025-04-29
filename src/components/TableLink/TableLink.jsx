import './tableLink.scss';
import { Link } from 'react-router-dom';
import linkIcon from '../../assets/icons/chevron_right-24px.svg';

function TableLink({link}) {

    return (
        <div className="table-link">
            <Link className="table-link__link" to={link.url}>{link.text}</Link>
            <img className="table-link__link-icon" src={linkIcon} alt="Link Icon" />
        </div>
    );
}

export default TableLink;