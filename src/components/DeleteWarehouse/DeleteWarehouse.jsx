import './deleteWarehouse.scss';
import Button from '../Button/Button';
import CloseIcon from '../../assets/icons/close-24px.svg';

function DeleteWarehouse() {

  return (
    <div className="delete-warehouse">
      <div className="delete-warehouse__close-button">
        <Button buttonText="" buttonType="icon-only" imgSrc={CloseIcon}/>
      </div>
      <div className="delete-warehouse__message">
        <h2 className="delete-warehouse__message-header">
          Are you sure you want to delete this warehouse?
        </h2>
        <p className="delete-warehouse__message-text">
          This action cannot be undone.
        </p>
      </div>
      <div className="delete-warehouse__buttons">
        <Button buttonText="Cancel" buttonType="delete"/>
        <Button buttonText="Delete" buttonType="secondary"/>
      </div>
    </div>
  );
};

export default DeleteWarehouse;