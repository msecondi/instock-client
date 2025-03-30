import './tableRow.scss';
import TableLink from '../TableLink/TableLink';
import TableAction from '../TableAction/TableAction';

function TableRow({warehouse}) {
    const link = {
        url: warehouse.link,
        text: warehouse.name
    }

    return (
        <div className="table-row">
            <div className="table-row__info-groups">
                <div className="table-row__info-group-1">
                    <div className="table-row__info">
                        <label className="table-row__label">WAREHOUSE</label>
                        <TableLink link={link} />
                    </div>
                    <div className="table-row__info">
                        <label className="table-row__label">ADDRESS</label>
                        <span className="table-row__text">{warehouse.address}</span>
                    </div>
                </div>
                <div className="table-row__info-group-2">
                    <div className="table-row__info">
                        <label className="table-row__label">CONTACT NAME</label>
                        <span className="table-row__text">{warehouse.contactName}</span>
                    </div>
                    <div className="table-row__info">
                        <label className="table-row__label">CONTACT INFORMATION</label>
                        <div className="table-row__contact-info">
                            <span className="table-row__text">{warehouse.phoneNumber}</span>
                            <span className="table-row__text">{warehouse.email}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="table-row__action-group">
                <TableAction />
            </div>
        </div>
    );
}

export default TableRow;