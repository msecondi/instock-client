import './deleteInventory.scss';
import { useEffect } from 'react';
import { inventoryPageIndex } from '../../data/appData.json';

function DeleteInventory({setNavIndex}) {
    useEffect(() => {
        setNavIndex(inventoryPageIndex);
    }, []);

    return (
        <main className="delete-inventory">

        </main>
    );
}

export default DeleteInventory;