import './tableHeaderLabel.scss';
import Button from '../Button/Button';
import SortIcon from '../../assets/icons/sort-24px.svg';

function TableHeaderLabel({onClick, labelText, currentInfoObj}) {

    const currentInfo = Object.entries(currentInfoObj).find( ([_key, value]) => value === labelText );
    
    return (
        <div className="table-header-label">
            <label className="table-header-label__label">{labelText}</label>
            <Button imgSrc={SortIcon} buttonType="icon-only" onClick={onClick} currentInfo={currentInfo} />
        </div>
    );
}

export default TableHeaderLabel;