import './textFormField.scss';
import { useState } from 'react';
import ErrorIcon from '../../assets/icons/error-24px.svg';

const TextFormField = ({ placeHolder, setInputText, isError }) => {
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

    return (
        <div className="field">
            <div className={`field__input-box ${isActive ? 'field__input-box--active-border' : ''} ${isError ? 'field__input-box--error-border': ''}`}>
                <input className="field__input" 
                    type="text" 
                    placeholder={placeHolder} 
                    onFocus={inputOnFocus} 
                    onBlur={inputOnFocus} 
                    onChange={inputText}/> 
            </div>
            <div className={`field__error-container ${isError ? 'field__error-container--show' : ''}`}>
                <img className="field__error-icon" src={ErrorIcon} alt="Error Icon" />
                <label className="field__error-text">This field is required</label>
            </div>
        </div>
    );
};

export default TextFormField;