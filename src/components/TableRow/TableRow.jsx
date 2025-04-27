import './tableRow.scss';
import TableLink from '../TableLink/TableLink';
import TableAction from '../TableAction/TableAction';

function TableRow({warehouse}) {
    const link = {
        url: `/warehouses/${warehouse.id}`,
        text: warehouse.warehouse_name
    }

    return (
        <div className="table-row">
            <div className="table-row__info-groups">
                <div className="table-row__info-group-1">
                    <div className="table-row__info table-row__info--bottom-margin">
                        <label className="table-row__label">WAREHOUSE</label>
                        <TableLink link={link} />
                    </div>
                    <div className="table-row__info">
                        <label className="table-row__label">ADDRESS</label>
                        <span className="table-row__text">{warehouse.address}, {warehouse.city}, {warehouse.country}</span>
                    </div>
                </div>
                <div className="table-row__info-group-2">
                    <div className="table-row__info table-row__info--bottom-margin">
                        <label className="table-row__label">CONTACT NAME</label>
                        <span className="table-row__text">{warehouse.contact_name}</span>
                    </div>
                    <div className="table-row__info">
                        <label className="table-row__label">CONTACT INFORMATION</label>
                        <div className="table-row__contact-info">
                            <span className="table-row__text">{warehouse.contact_phone}</span>
                            <span className="table-row__text">{warehouse.contact_email}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="table-row__action-group">
                <TableAction startOfRoute="warehouses" id={warehouse.id} />
            </div>
        </div>
    );
}

export default TableRow;