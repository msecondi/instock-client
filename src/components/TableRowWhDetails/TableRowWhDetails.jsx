import './tableRowWhDetails.scss';
import TableLink from '../TableLink/TableLink';
import TableAction from '../TableAction/TableAction';
import InStockTag from '../InStockTag/InStockTag';

function TableRowWhDetails({inventory}) {
    const link = {
        url: `/inventories/${inventory.id}`,
        text: inventory.item_name
    }

    return (
        <div className="table-row">
            <div className="table-row__info-groups">
                <div className="table-row__info-group-1">
                    <div className="table-row__info table-row__info--bottom-margin">
                        <label className="table-row__label">INVENTORY ITEM</label>
                        <TableLink link={link} />
                    </div>
                    <div className="table-row__info">
                        <label className="table-row__label">CATEGORY</label>
                        <span className="table-row__text">{inventory.category}</span>
                    </div>
                </div>  
                <div className="table-row__info-group-2">
                    <div className="table-row__info table-row__info--bottom-margin">
                        <label className="table-row__label">STATUS</label>
                        <InStockTag statusString={inventory.status} />
                    </div>
                    <div className="table-row__info">
                        <label className="table-row__label">QUANTITY</label>
                        <span className="table-row__text">{inventory.quantity}</span>
                    </div>
                </div>
            </div>
            <div className="table-row__action-group">
                <TableAction startOfRoute="inventories" id={inventory.id} />
            </div>
        </div>
    );
}

export default TableRowWhDetails;