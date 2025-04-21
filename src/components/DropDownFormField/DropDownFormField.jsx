import './DropDownFormField.scss';
import { useState } from 'react';
import ErrorIcon from '../../assets/icons/error-24px.svg';
import { ReactComponent as DropDownIcon } from '../../assets/icons/arrow_drop_down-24px.svg';

const DropDownFormField = ({ placeHolder, setInputText, isError }) => {
    const [isActive, setIsActive] = useState(false);

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

    console.log(DropDownIcon);

    return (
        <div className="ddField">
            <div className={`ddField__input-box ${isActive ? 'ddField__input-box--active-border' : ''} ${isError ? 'ddField__input-box--error-border': ''}`}>
                <input className="ddField__input" 
                    type="text" 
                    placeholder={placeHolder} 
                    onFocus={inputOnFocus} 
                    onBlur={inputOnFocus} 
                    onChange={inputText}/> 
                <div className="ddField__icon">
                    <DropDownIcon className={`ddField__icon-img ${isActive ? 'ddField__icon-img--active' : ''}`} />
                </div>
            </div>
            <div className={`ddField__error-container ${isError ? 'ddField__error-container--show' : ''}`}>
                <img className="ddField__error-icon" src={ErrorIcon} alt="Error Icon" />
                <label className="ddField__error-text">This ddField is required</label>
            </div>
        </div>
    );
};

export default DropDownFormField;