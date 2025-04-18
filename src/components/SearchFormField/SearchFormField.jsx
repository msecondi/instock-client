import './searchFormField.scss';
import { useState } from 'react';
import SearchIcon from '../../assets/icons/search-24px.svg';

const SearchFormField = () => {
    const [isActive, setIsActive] = useState(false);
    
    const inputOnFocus = () => {
        setIsActive(true);
    }

    return (
        <div className={`search search--right-margin ${isActive ? 'search--active-border' : ''}`}>
            <input className="search__input" type="text" placeholder="Search..." onFocus={inputOnFocus}/> 
            <button className="search__button">
                <img className="search__icon" src={SearchIcon} alt="Search Icon" />
            </button>
        </div>
    );
};

export default SearchFormField;