import './inventories.scss';
import { useState, useEffect } from 'react';
import { inventoriesEndpoint, inventoryPageIndex } from '../../data/appData.json';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { Outlet, useLocation } from 'react-router-dom';
import Hero from '../../components/Hero/Hero';
import TableHeader from '../../components/TableHeader/TableHeader';
import TableRowInventory from '../../components/TableRowInventory/TableRowInventory';

function Inventories({setNavIndex, setDeleteModal}) {
    useEffect(() => {
        setNavIndex(inventoryPageIndex);
    }, []);

    const [inventories, setInventories] = useState([]);
    const [isDeleting, setIsDeleting] = useState(false);
    const [doRefresh, setDoRefresh] = useState(false);
    const currentPath = useLocation().pathname;

    const fetchInventories = async () => {
        try {
            const inventoriesResponse = await axios.get(inventoriesEndpoint);
            setInventories(inventoriesResponse.data);
        } catch (error) {
            console.log(`Could not load inventories: ${error}`);
        }
    }

    const renderInventories = () => {
        return inventories.map((inventory) => {
            return (
                <TableRowInventory inventory={inventory} showWarehouse={true} key={uuidv4()}/>
            );
        });
    }

    useEffect( () => { 
        fetchInventories(); 
    }, []);
    useEffect( () => {
        if (currentPath.includes('delete')) {
            setIsDeleting(true);
            setDeleteModal(true);
        } else {
            setIsDeleting(false);
            setDeleteModal(false);
        }
    }, [currentPath]);
    useEffect( () => {
        if (doRefresh) {
            fetchInventories();
            setDoRefresh(false);
        }
    }, [doRefresh]);

    const tableLabels = ['INVENTORY ITEM', 'CATEGORY', 'STATUS', 'QTY', 'WAREHOUSE'];

    return (
        <main className="inventories">
            <div className={`inventories__page-background ${isDeleting ? 'inventories__page-foreground--hide' : ''}`}></div>
            <div className={`inventories__page-foreground ${isDeleting ? 'inventories__page-foreground--hide' : ''}`}>
                <Hero heroTitle="Inventory" buttonText="+ Add New Item" addButtonUrl={'/inventories/add'}/>
                <section className="inventories__table">
                    <TableHeader labels={tableLabels} />
                    {renderInventories()}
                </section>
            </div>
            <div className={`inventories__dimming-overlay ${isDeleting ? '' : 'inventories__dimming-overlay--hidden'}`}></div>
            <div className={`inventories__delete-modal ${isDeleting ? '' : 'inventories__delete-modal--hidden'}`}>
                <Outlet context={{ setDoRefresh }}/>
            </div>
        </main>
    );
}

export default Inventories;