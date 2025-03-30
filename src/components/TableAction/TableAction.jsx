import './tableAction.scss';
import Button from '../Button/Button';
import EditIcon from '../../assets/icons/edit-24px.svg';
import DeleteIcon from '../../assets/icons/delete_outline-24px.svg';

function TableAction({deleteAction, editAction}) {
    return (
        <div className="table-action">
            <div className="table-action__left-button">
                <Button buttonType={'icon-only'} imgSrc={DeleteIcon} onClick={deleteAction}/>
            </div>
            <div className="table-action__right-button">
                <Button buttonType={'icon-only'} imgSrc={EditIcon} onClick={editAction}/>
            </div>
        </div>
    );
}

export default TableAction;