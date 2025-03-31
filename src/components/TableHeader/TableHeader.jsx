import './tableHeader.scss';
import Button from '../Button/Button';
import SortIcon from '../../assets/icons/sort-24px.svg';

function TableHeader() {
    return (
        <div className="table-header">
            <div className="table-header__info-groups">
                <div className="table-header__info-group-1">
                    <div className="table-header__column-label">
                        <label className="table-header__label">WAREHOUSE</label>
                        <Button imgSrc={SortIcon} buttonType="icon-only" />
                    </div>
                    <div className="table-header__column-label">
                        <label className="table-header__label">ADDRESS</label>
                        <Button imgSrc={SortIcon} buttonType="icon-only" />
                    </div>
                </div>
                <div className="table-header__info-group-2">
                    <div className="table-header__column-label">
                        <label className="table-header__label">CONTACT NAME</label>
                        <Button imgSrc={SortIcon} buttonType="icon-only" />
                    </div>
                    <div className="table-header__column-label">
                        <label className="table-header__label">CONTACT INFORMATION</label>
                        <Button imgSrc={SortIcon} buttonType="icon-only" />
                    </div>
                </div>
            </div>
            <div className="table-header__actions">
                <label className="table-header__label">ACTIONS</label>
            </div>
        </div>
    );
}

export default TableHeader;