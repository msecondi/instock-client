import './tableAction.scss';
import Button from '../Button/Button';
import editIcon from '../../assets/icons/edit-24px.svg';
import deleteIcon from '../../assets/icons/delete_outline-24px.svg';

function TableAction({deleteAction, editAction}) {
    return (
        <div className="table-action">
            <div className="table-action__left-button">
                <Button buttonType={'icon-only'} imgSrc={deleteIcon} onClick={deleteAction}/>
            </div>
            <div className="table-action__right-button">
                <Button buttonType={'icon-only'} imgSrc={editIcon} onClick={editAction}/>
            </div>
        </div>
    );
}

export default TableAction;