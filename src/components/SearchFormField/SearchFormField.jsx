import './searchFormField.scss';
import SearchIcon from '../../assets/icons/search-24px.svg';

const SearchFormField = () => {
    return (
        <div className="search search--right-margin">
            <input className="search__input" type="text" placeholder="Search..." /> 
            <button className="search__button">
                <img className="search__icon" src={SearchIcon} alt="Search Icon" />
            </button>
        </div>
    );
};

export default SearchFormField;