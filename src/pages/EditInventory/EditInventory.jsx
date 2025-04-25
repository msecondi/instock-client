import './editInventory.scss';
import { useEffect } from 'react';
import { inventoryPageIndex } from '../../data/appData.json';

function EditInventory({setNavIndex}) {
    useEffect(() => {
        setNavIndex(inventoryPageIndex);
    }, []);

    return (
        <main className="edit-inventory">

        </main>
    );
}

export default EditInventory;