import './header.scss';
import { Link, NavLink } from 'react-router-dom';
import Logo from '../../assets/images/InStock-Logo_1x.png';
import Button from '../Button/Button.jsx';

function Header() {
    return (
        <header className="header">
            <Link className="header__logo" to="/">
                <img className="header__logo-img" src={Logo} alt="InStock logo" />
            </Link>
            <nav className="header__nav">
                <NavLink className="header__nav-link header__nav-link--right-margin" to="/">
                    { ({isActive}) => (
                        <Button buttonText="Warehouse" 
                            buttonType={isActive ? 'nav--active' : 'nav'} />
                    )}
                </NavLink>
                <NavLink className="header__nav-link" to="/inventory">
                    { ({isActive}) => (
                        <Button buttonText="Inventory" 
                            buttonType={isActive ? 'nav--active' : 'nav'} />
                    )}
                </NavLink>
            </nav>
        </header>
    );
}

export default Header;