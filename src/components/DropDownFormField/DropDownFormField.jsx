import './DropDownFormField.scss';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import ErrorIcon from '../../assets/icons/error-24px.svg';
import { ReactComponent as DropDownIcon } from '../../assets/icons/arrow_drop_down-24px.svg';

const DropDownFormField = ({ placeHolder, setInputText, isError, dropDownItems }) => {
    const [isActive, setIsActive] = useState(false);
    const [isDropDownOpen, setIsDropDownOpen] = useState(false);
    const [ddSelectedText, setDdSelectedText] = useState('');

    const inputOnFocus = (event) => {
        event.preventDefault();

        setIsActive(!isActive);
    }

    const inputText = (event) => {
        event.preventDefault();

        if (setInputText) {
            setInputText(event.target.value);
        }
    }

    const toggleDropDown = () => {
        setIsDropDownOpen(!isDropDownOpen);
        setIsActive(!isActive);
    }

    const itemSelectedOnClick = (event) => {
        event.preventDefault();
        
        setDdSelectedText(dropDownItems[event.currentTarget.id]);
    }

    const renderDropDownItems = () => {
        return (
            <div className={`ddField__items ${isDropDownOpen ? 'ddField__items--show' : ''}`}>
                {dropDownItems.map((item, index) => (
                    <button className="ddField__item" key={index} id={index} onClick={itemSelectedOnClick}>
                        <label className="ddField__item-label">{item}</label>
                    </button>
                ))}
            </div>
        );
    }

    return (
        <div className="ddField">
            <div className={`ddField__box ddField__box--open-dropdown ${isDropDownOpen ? 'ddField__box--active-border' : ''} ${isError ? 'ddField__box--error-border': ''}`}>
                <div className="ddField__box-inputs">
                    <input className="ddField__input" 
                        type="text" 
                        placeholder={placeHolder} 
                        onFocus={inputOnFocus} 
                        onBlur={inputOnFocus} 
                        onChange={inputText}
                        value={ddSelectedText}/>
                    <button className="ddField__icon-button" onClick={toggleDropDown}>
                        <DropDownIcon className={`ddField__icon-img ${isActive ? 'ddField__icon-img--active' : ''}`} />
                    </button>
                </div>
                {renderDropDownItems()}
            </div>
            <div className={`ddField__error-container ${isError ? 'ddField__error-container--show' : ''}`}>
                <img className="ddField__error-icon" src={ErrorIcon} alt="Error Icon" />
                <label className="ddField__error-text">This ddField is required</label>
            </div>
        </div>
    );
};

export default DropDownFormField;