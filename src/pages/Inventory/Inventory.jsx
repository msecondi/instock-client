import './inventory.scss';
import { useEffect } from 'react';
import { inventoryPageIndex } from '../../data/appData.json';

function Inventory({setNavIndex}) {
    useEffect(() => {
        setNavIndex(inventoryPageIndex);
    }, []);

    return (
        <main className="inventory">

        </main>
    );
}

export default Inventory;