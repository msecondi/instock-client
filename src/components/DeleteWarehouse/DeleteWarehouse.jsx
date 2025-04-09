import './deleteWarehouse.scss';
import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {warehousesEndpoint, inventoriesEndpoint } from '../../data/appData.json';
import Button from '../Button/Button';
import CloseIcon from '../../assets/icons/close-24px.svg';

function DeleteWarehouse() {
  const [messageHeading, setMessageHeading] = useState('');
  const [messageText, setMessageText] = useState('');

  const isWarehouse = useLocation().pathname.includes('warehouse');
  const isInventory = useLocation().pathname.includes('inventories');
  const id = useParams().id;

  const setWarehouseMessage = async () => {
    try {
      const warehouseResponse = await axios.get(`${warehousesEndpoint}/${id}`);
      const warehouse = warehouseResponse.data;

      if (warehouse == null || warehouse.length === 0) {
        throw new Error(`Warehouse with id ${id} does not exist. warehouse: ${warehouse}`);
      }

      setMessageHeading(`Delete ${warehouse.warehouse_name} warehouse?`);
      setMessageText(`Please confirm that you'd like to delete the ${warehouse.warehouse_name} warehouse from the list of warehouses. You won't be able to undo this action.`);

    } catch (error) {
      console.log(`Could not load item id: ${id}, error: ${error.message}`);
      setMessageHeading('Error');
      setMessageText(`Could not load warehouse.`);
    }
  }

  const setInventoryMessage = async () => {
    try {
      const warehouseResponse = await axios.get(`${warehousesEndpoint}/${id}`);
      const warehouse = warehouseResponse.data;

      if (warehouse == null || warehouse.length === 0) {
        throw new Error(`Warehouse with id ${id} does not exist. warehouse: ${warehouse}`);
      }

      setMessageHeading(`Delete ${warehouse.warehouse_name} warehouse?`);
      setMessageText(`Please confirm that you'd like to delete the ${warehouse.warehouse_name} warehouse from the list of warehouses. You won't be able to undo this action.`);

    } catch (error) {
      console.log(`Could not load item id: ${id}, error: ${error.message}`);
      setMessageHeading('Error');
      setMessageText(`Could not load warehouse.`);
    }
  }

  useEffect(() => {
    if (isWarehouse) {  
      setWarehouseMessage();
    }

    if (isInventory) {  
      setWarehouseMessage();
    }
      
  }, []);

  return (
    <div className="delete-warehouse">
      <div className="delete-warehouse__close-button">
        <Button buttonText="" buttonType="icon-only" imgSrc={CloseIcon}/>
      </div>
      <div className="delete-warehouse__message">
        <h2 className="delete-warehouse__message-header">
          { messageHeading }
        </h2>
        <p className="delete-warehouse__message-text">
          { messageText }
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