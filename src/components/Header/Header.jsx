import './header.scss';
import { Link, NavLink } from 'react-router-dom';
import { warehousesPageIndex, inventoryPageIndex } from '../../data/appData';
import svgLogo from '../../assets/images/Instock-Logo.svg';
import Button from '../Button/Button.jsx';

function Header({navIndex}) {

    return (
        <header className="header">
            <Link className="header__logo" to="/">
                <img src={svgLogo} />
            </Link>
            <nav className="header__nav">
                <NavLink className="header__nav-link header__nav-link--right-margin" to="/">
                    <Button buttonText="Warehouses" buttonType={navIndex === warehousesPageIndex ? 'nav--active' : 'nav'} />
                </NavLink>
                <NavLink className="header__nav-link" to="/inventories">
                    <Button buttonText="Inventory" buttonType={navIndex === inventoryPageIndex ? 'nav--active' : 'nav'} />
                </NavLink>
            </nav>
        </header>
    );
}

export default Header;