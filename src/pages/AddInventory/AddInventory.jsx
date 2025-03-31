import './addInventory.scss';
import { useEffect } from 'react';
import { inventoryPageIndex } from '../../data/appData.json';

function AddInventory({setNavIndex}) {
    useEffect(() => {
        setNavIndex(inventoryPageIndex);
    }, []);

    return (
        <main className="add-inventory">

        </main>
    );
}

export default AddInventory;