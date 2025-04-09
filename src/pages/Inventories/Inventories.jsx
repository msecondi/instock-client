import './inventories.scss';
import { useState, useEffect } from 'react';
import { inventoriesEndpoint, inventoryPageIndex } from '../../data/appData.json';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { Outlet } from 'react-router-dom';
import Hero from '../../components/Hero/Hero';
import TableHeader from '../../components/TableHeader/TableHeader';
import TableRowInventory from '../../components/TableRowInventory/TableRowInventory';

function Inventories({setNavIndex}) {
    useEffect(() => {
        setNavIndex(inventoryPageIndex);
    }, []);

    const [inventories, setInventories] = useState([]);

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

    const tableLabels = ['INVENTORY ITEM', 'CATEGORY', 'STATUS', 'QTY', 'WAREHOUSE'];

    return (
        <main className="inventories">
            <div className="inventories__page-background"></div>
            <div className="inventories__page-foreground">
                <Hero heroTitle="Inventory" buttonText="+ Add New Item" addButtonUrl={'/inventories/add'}/>
                <section className="inventories__table">
                    <TableHeader labels={tableLabels} />
                    {renderInventories()}
                </section>
            </div>
            <Outlet />
        </main>
    );
}

export default Inventories;