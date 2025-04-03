import './tableHeader.scss';
import Button from '../Button/Button';
import SortIcon from '../../assets/icons/sort-24px.svg';
import TableHeaderLabel from '../TableHeaderLabel/TableHeaderLabel';

function TableHeader({labels}) {
    return (
        <div className="table-header">
            <div className="table-header__info-groups">
                {
                    labels.map((label, index) => (
                        <TableHeaderLabel key={index} labelText={label} />
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