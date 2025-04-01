import './tableHeaderWhDetails.scss';
import Button from '../Button/Button';
import SortIcon from '../../assets/icons/sort-24px.svg';

function TableHeaderWhDetails() {
    return (
        <div className="table-header">
            <div className="table-header__info-groups">
                <div className="table-header__info-group-1">
                    <div className="table-header__column-label">
                        <label className="table-header__label">INVENTORY ITEM</label>
                        <Button imgSrc={SortIcon} buttonType="icon-only" />
                    </div>
                    <div className="table-header__column-label">
                        <label className="table-header__label">CATEGORY</label>
                        <Button imgSrc={SortIcon} buttonType="icon-only" />
                    </div>
                </div>
                <div className="table-header__info-group-2">
                    <div className="table-header__column-label">
                        <label className="table-header__label">STATUS</label>
                        <Button imgSrc={SortIcon} buttonType="icon-only" />
                    </div>
                    <div className="table-header__column-label">
                        <label className="table-header__label">QUANTITY</label>
                        <Button imgSrc={SortIcon} buttonType="icon-only" />
                    </div>
                </div>
            </div>
            <div className="table-header__actions">
                <label className="table-header__label">ACTION</label>
            </div>
        </div>
    );
}

export default TableHeaderWhDetails;