import './warehouses.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { warehousesEndpoint, warehousesPageIndex } from '../../data/appData.json';
import { v4 as uuidv4 } from 'uuid';
import { Outlet, useLocation } from 'react-router-dom';
import Hero from '../../components/Hero/Hero';
import TableHeader from '../../components/TableHeader/TableHeader';
import TableRow from '../../components/TableRow/TableRow';

function Warehouses({setNavIndex, setDeleteModal}) {
    useEffect(() => {
        setNavIndex(warehousesPageIndex);
    }, []);
    
    const [warehouses, setWarehouses] = useState([]);
    const [isDeleting, setIsDeleting] = useState(false);
    const currentPath = useLocation().pathname;

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
    useEffect( () => {
        if (currentPath.includes('delete')) {
            setIsDeleting(true);
            setDeleteModal(true);
        } else {
            setIsDeleting(false);
            setDeleteModal(false);
        }
    }, [currentPath]);

    const tableLabels = ['WAREHOUSE', 'ADDRESS', 'CONTACT NAME', 'CONTACT INFORMATION'];

    return (
        <main className="warehouses">
            <div className="warehouses__page-background"></div>
            <div className="warehouses__page-foreground">
                <Hero heroTitle="Warehouses" buttonText="+ Add New Warehouse" addButtonUrl={'/warehouses/add'}/>
                <section className="warehouses__table">
                    <TableHeader labels={tableLabels}/>
                    {renderWarehouses()}
                </section>
            </div>
            <div className={`warehouses__dimming-overlay ${isDeleting ? '' : 'warehouses__dimming-overlay--hidden'}`}></div>
            <div className={`warehouses__delete-modal ${isDeleting ? '' : 'warehouses__delete-modal--hidden'}`}>
                <Outlet />
            </div>
        </main>
    );
}

export default Warehouses;