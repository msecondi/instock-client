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
    const [filteredData, setFilteredData] = useState(null);
    const [hasSearched, setHasSearched] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [doRefresh, setDoRefresh] = useState(false);
    const currentPath = useLocation().pathname;

    const fetchWarehouses = async () => {
        try {
            const warehousesResponse = await axios.get(warehousesEndpoint);
            setWarehouses(warehousesResponse.data);
        } catch (error) {
            console.log(`Could not load warehouses: ${error}`);
        }
    }

    useEffect( () => { 
        fetchWarehouses(); 
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
            fetchWarehouses();
            setDoRefresh(false);
        }
    }, [doRefresh]);

    const handleClick = (filteredResults) => {
        setFilteredData(filteredResults);
        setHasSearched(true)
    }

    const tableLabels = ['WAREHOUSE', 'ADDRESS', 'CONTACT NAME', 'CONTACT INFORMATION'];
    const displayData = hasSearched ? filteredData : warehouses;

    return (
        <main className="warehouses">
            <div className={`warehouses__page-background ${isDeleting ? 'warehouses__page-background--hide' : ''}`}></div>
            <div className={`warehouses__page-foreground ${isDeleting ? 'warehouses__page-foreground--hide' : ''}`}>
                <Hero dataToRender={warehouses} handleClick={handleClick} buttonText="+ Add New Warehouse" addButtonUrl={'/warehouses/add'}/>
                <section className="warehouses__table">
                    <TableHeader labels={tableLabels}/>
                    {/* use a conditional here to either map searched items, or display no results found IF user searched */}
                    {displayData.length > 0 ? displayData.map((warehouse) => (
                        <TableRow warehouse={warehouse} key={uuidv4()} />
                    )) 
                    :  hasSearched ? <div className="warehouses__table--no-results">
                            No warehouses match your search. Please try again.
                        </div> 
                    : null
                    }
                </section>
            </div>
            <div className={`warehouses__dimming-overlay ${isDeleting ? '' : 'warehouses__dimming-overlay--hidden'}`}></div>
            <div className={`warehouses__delete-modal ${isDeleting ? '' : 'warehouses__delete-modal--hidden'}`}>
                <Outlet context={{ setDoRefresh }}/>
            </div>
        </main>
    );
}

export default Warehouses;