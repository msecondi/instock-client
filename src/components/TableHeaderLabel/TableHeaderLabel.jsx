import './tableHeaderLabel.scss';
import Button from '../Button/Button';
import SortIcon from '../../assets/icons/sort-24px.svg';

function TableHeaderLabel({onClick, labelText}) {
    return (
        <div className="table-header__column-label">
            <label className="table-header__label">{labelText}</label>
            <Button imgSrc={SortIcon} buttonType="icon-only" onClick={onClick}/>
        </div>
    );
}

export default TableHeaderLabel;