import './header.scss';
import { Link, NavLink } from 'react-router-dom';
import { warehousesPageIndex, inventoryPageIndex } from '../../data/appData';
import LogoX1 from '../../assets/images/InStock-Logo_1x.png';
import LogoX2 from '../../assets/images/InStock-Logo_2x.png';
import Button from '../Button/Button.jsx';

function Header({navIndex}) {

    return (
        <header className="header">
            <Link className="header__logo" to="/">
                <picture>
                        <img className="header__logo-img" src={LogoX1} alt="InStock logo" />
                        <source srcSet={LogoX2} media="(min-width: $min-tablet-breakpoint)" />
                </picture>
            </Link>
            <nav className="header__nav">
                <NavLink className="header__nav-link header__nav-link--right-margin" to="/">
                    <Button buttonText="Warehouses" buttonType={navIndex === warehousesPageIndex ? 'nav--active' : 'nav'} />
                </NavLink>
                <NavLink className="header__nav-link" to="/inventory">
                    <Button buttonText="Inventory" buttonType={navIndex === inventoryPageIndex ? 'nav--active' : 'nav'} />
                </NavLink>
            </nav>
        </header>
    );
}

export default Header;