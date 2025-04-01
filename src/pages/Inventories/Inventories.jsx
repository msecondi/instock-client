import './inventories.scss';
import { useEffect } from 'react';
import { inventoryPageIndex } from '../../data/appData.json';

function Inventories({setNavIndex}) {
    useEffect(() => {
        setNavIndex(inventoryPageIndex);
    }, []);

    return (
        <main className="inventories">

        </main>
    );
}

export default Inventories;