import './tableAction.scss';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import EditIcon from '../../assets/icons/edit-24px.svg';
import DeleteIcon from '../../assets/icons/delete_outline-24px.svg';

function TableAction({startOfRoute, id}) {
    return (
        <div className="table-action">
            <div className="table-action__left-button table-action__left-button--right-margin">
                <Link className="table-action__link" to={`/${startOfRoute}/${id}/delete`}>
                    <img className="table-action__link-icon" src={DeleteIcon} alt="Delete Icon" />
                </Link>
            </div>
            <div className="table-action__right-button">
                <Link className="table-action__link" to={`/${startOfRoute}/${id}/edit`}>
                    <img className="table-action__link-icon" src={EditIcon} alt="Edit Icon" />
                </Link>
            </div>
        </div>
    );
}

export default TableAction;