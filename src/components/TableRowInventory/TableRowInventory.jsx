import './tableRowInventory.scss';
import axios from 'axios';
import { warehousesEndpoint } from '../../data/appData.json';
import { useState, useEffect } from 'react';
import TableLink from '../TableLink/TableLink';
import TableAction from '../TableAction/TableAction';
import InStockTag from '../InStockTag/InStockTag';

function TableRowInventory({inventory, showWarehouse}) {
    const link = {
        url: `/inventories/${inventory.id}`,
        text: inventory.item_name
    }

    const [warehouseName, setWarehouseName] = useState('');
    const fetchWarehouseName = async () => {
        try {
            const response = await axios.get(`${warehousesEndpoint}/${inventory.warehouse_id}`);
            setWarehouseName(response.data.warehouse_name);
        } catch (error) {
            console.log(`Could not load warehouse name: ${error}`);
        }
    }

    useEffect(() => {
        if (showWarehouse) {
            fetchWarehouseName();
        }
    }, []);

    return (
        <div className="table-row-inventory">
            <div className="table-row-inventory__info-groups">
                <div className={`table-row-inventory__info-group-1 ${showWarehouse ? 'table-row-inventory__info-group-1--with-wh-name' : ''}`}>
                    <div className="table-row-inventory__info table-row-inventory__info--bottom-margin">
                        <label className="table-row-inventory__label">INVENTORY ITEM</label>
                        <TableLink link={link} />
                    </div>
                    <div className="table-row-inventory__info">
                        <label className="table-row-inventory__label">CATEGORY</label>
                        <span className="table-row-inventory__text">{inventory.category}</span>
                    </div>
                </div>  
                <div className={`table-row-inventory__info-group-2 ${showWarehouse ? 'table-row-inventory__info-group-2--with-wh-name' : ''}`}>
                    <div className="table-row-inventory__info table-row-inventory__info--bottom-margin">
                        <label className="table-row-inventory__label">STATUS</label>
                        <InStockTag statusString={inventory.status} />
                    </div>
                    <div className={`table-row-inventory__info ${showWarehouse ? 'table-row-inventory__info--bottom-margin' : ''}`}>
                        <label className="table-row-inventory__label">QUANTITY</label>
                        <span className="table-row-inventory__text">{inventory.quantity}</span>
                    </div>
                    <div className={`table-row-inventory__info ${showWarehouse ? '' : 'table-row-inventory--hidden'}`}>
                        <label className="table-row-inventory__label">WAREHOUSE</label>
                        <span className="table-row-inventory__text">{warehouseName}</span>
                    </div>
                </div>
            </div>
            <div className="table-row-inventory__action-group">
                <TableAction startOfRoute="inventories" id={inventory.id} />
            </div>
        </div>
    );
}

export default TableRowInventory;