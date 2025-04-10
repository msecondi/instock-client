import './deleteModal.scss';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {warehousesEndpoint, inventoriesEndpoint } from '../../data/appData.json';
import Button from '../Button/Button';
import CloseIcon from '../../assets/icons/close-24px.svg';

function DeleteModal() {
  const [messageHeading, setMessageHeading] = useState('');
  const [messageText, setMessageText] = useState('');

  const isWarehouse = useLocation().pathname.includes('warehouse');
  const isInventory = useLocation().pathname.includes('inventories');
  const id = useParams().id;

  const setWarehouseMessage = async () => {
    try {
      const warehouseResponse = await axios.get(`${warehousesEndpoint}/${id}`);
      
      if (warehouseResponse == null || warehouseResponse.length === 0 || 
        warehouseResponse.data == null || warehouseResponse.data.length === 0) {
        throw new Error(`Warehouse with id ${id} does not exist. Warehouse response: ${warehouseResponse}`);
      }
      
      setMessageHeading(`Delete ${warehouseResponse.data.warehouse_name} warehouse?`);
      setMessageText(`Please confirm that you'd like to delete the ${warehouseResponse.data.warehouse_name} warehouse from the list of warehouses. You won't be able to undo this action.`);

    } catch (error) {
      console.log(`Could not load item id: ${id}, error: ${error.message}`);
      setMessageHeading('Error');
      setMessageText(`Could not load warehouse.`);
    }
  }

  const setInventoryMessage = async () => {
    try {
      const inventoryResponse = await axios.get(`${inventoriesEndpoint}/${id}`);

      if (inventoryResponse == null || inventoryResponse.length === 0 || 
        inventoryResponse.data == null || inventoryResponse.data.length === 0) {
        throw new Error(`Inventory item with id ${id} does not exist. Inventory Response: ${inventoryResponse}`);
      }

      setMessageHeading(`Delete ${inventoryResponse.data.item_name} inventory item?`);
      setMessageText(`Please confirm that you'd like to delete ${inventoryResponse.data.item_name} from the inventory list. You won't be able to undo this action.`);

    } catch (error) {
      console.log(`Could not load item id: ${id}, error: ${error.message}`);
      setMessageHeading('Error');
      setMessageText(`Could not load inventory item.`);
    }
  }

  const onClickDelete = async () => {
    try {
      console.log('Delete was clicked');
    } catch (error) {
      console.log(`Could not delete item id: ${id}, error: ${error.message}`);
    }
  }

  useEffect(() => {
    if (isWarehouse) {  
      setWarehouseMessage();
    }

    if (isInventory) {  
      setInventoryMessage();
    }
      
  }, []);

  return (
    <div className="delete-modal__wrapper">
      <div className="delete-modal__left-right-spacing"></div>
      <div className="delete-modal">
        <div className="delete-modal__x-button">
          <Link className="delete-modal__x-button-link" to={`${isWarehouse ? '/' : isInventory ? '/inventories' : ''}`}>
            <Button buttonText="" buttonType="icon-only" imgSrc={CloseIcon}/>
          </Link>
        </div>
        <div className="delete-modal__message">
          <h2 className="delete-modal__message-header">
            { messageHeading }
          </h2>
          <p className="delete-modal__message-text">
            { messageText }
          </p>
        </div>
        <div className="delete-modal__buttons">
          <Link className="delete-modal__button-link delete-modal__button-link--right-margin " to={`${isWarehouse ? '/' : isInventory ? '/inventories' : ''}`}>
            <Button buttonText="Cancel" buttonType="secondary"/>
          </Link>
          <Link className="delete-modal__button-link" to={`${isWarehouse ? '/' : isInventory ? '/inventories' : ''}`}>
            <Button buttonText="Delete" buttonType="delete" onClick={onClickDelete}/>
          </Link>
        </div>
      </div>
      <div className="delete-modal__left-right-spacing"></div>
    </div>
  );
};

export default DeleteModal;