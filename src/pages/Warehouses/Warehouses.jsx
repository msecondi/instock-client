import './warehouses.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { warehousesEndpoint, warehousesPageIndex } from '../../data/appData.json';
import { v4 as uuidv4 } from 'uuid';
import Hero from '../../components/Hero/Hero';
import TableHeader from '../../components/TableHeader/TableHeader';
import TableRow from '../../components/TableRow/TableRow';

function Warehouses({setNavIndex}) {
    useEffect(() => {
        setNavIndex(warehousesPageIndex);
    }, []);
    
    const [warehouses, setWarehouses] = useState([]);

    const fetchWarehouses = async () => {
        try {
            const warehousesResponse = await axios.get(warehousesEndpoint);
            setWarehouses(warehousesResponse.data);
        } catch (error) {
            console.log(`Could not load warehouses: ${error}`);
        }
    }

    const renderWarehouses = () => {
        return warehouses.map((warehouse) => {
            return (
                <TableRow warehouse={warehouse} key={uuidv4()}/>
            );
        });
    }

    useEffect( () => { fetchWarehouses(); }, []);

    return (
        <main className="warehouses">
            <div className="warehouses__page-background"></div>
            <div className="warehouses__page-foreground">
                <Hero heroTitle="Warehouses" buttonText="+ Add New Warehouse"/>
                <section className="warehouses__table">
                    <TableHeader />
                    {renderWarehouses()}
                </section>
            </div>
        </main>
    );
}

export default Warehouses;