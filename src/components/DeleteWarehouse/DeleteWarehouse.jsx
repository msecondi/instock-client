import './deleteWarehouse.scss';

function DeleteWarehouse() {

  return (
    <div className="delete-warehouse">
      <h2>Are you sure you want to delete this warehouse?</h2>
      <p>This action cannot be undone.</p>
      <div className="delete-warehouse__buttons">
        <button className="delete-warehouse__button delete-warehouse__button--cancel">Cancel</button>
        <button className="delete-warehouse__button delete-warehouse__button--delete">Delete</button>
      </div>
    </div>
  );
};

export default DeleteWarehouse;