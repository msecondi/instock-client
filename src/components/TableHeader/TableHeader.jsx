import './tableHeader.scss';
import TableHeaderLabel from '../TableHeaderLabel/TableHeaderLabel';

function TableHeader({labels, handleSort}) {
    //check which page we are loading
    const currentPage = labels[0] === 'WAREHOUSE' ? 'wh' : 'inv';
    let currentInfoObj = {}

    if(currentPage === 'wh') { //rendering warehouses page
        currentInfoObj = {
            warehouse_name: 'WAREHOUSE',
            address: 'ADDRESS',
            contact_name: 'CONTACT NAME',
            contact_email: 'CONTACT INFORMATION'
        }
    } 
    else { //rendering inventories page 
        currentInfoObj = {
            item_name: 'INVENTORY ITEM',
            category: 'CATEGORY',
            status: 'STATUS',
            quantity: 'QTY',
            warehouse_id: 'WAREHOUSE'
        }
    }
    return (
        <div className="table-header">
            <div className="table-header__info-groups">
                {
                    labels.map((label, index) => (
                        <TableHeaderLabel key={index} onClick={handleSort} labelText={label} currentInfoObj={currentInfoObj}/>
                    ))
                }
            </div>
            <div className="table-header__actions">
                <label className="table-header__label">ACTIONS</label>
            </div>
        </div>
    );
}

export default TableHeader;