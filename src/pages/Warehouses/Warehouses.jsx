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

    //add sorting functionality
    const [sortBy, setSortBy] = useState(null);
    const [orderBy, setOrderBy] = useState('asc');
    const [hasSorted, setHasSorted] = useState(false);

    const handleSort = async (columnName) => {
        //will be 'asc' on first render, second render, if user clicks same column, will be 'desc'
        const newOrder = (sortBy === columnName && orderBy === 'asc') ? 'desc' : 'asc';
        setSortBy(columnName);
        setOrderBy(newOrder);
        setHasSorted(true);

        //then make the api call and set warehouses to response
        try {
            const response = await axios.get(`${warehousesEndpoint}/sort/${columnName}/order/${newOrder}`);
            //check if user has searched. If they have, filter the sorted response.data using the already filtered search data then set it to filteredData
            if (hasSearched) {
                const filteredIds = filteredData.map(item => item.id);
                const reFiltered = response.data.filter(item => filteredIds.includes(item.id));
                setFilteredData(reFiltered);
            } else {
                setWarehouses(response.data);
            }
        }
        catch(error) {
            console.error(error);
        }
    }

    const tableLabels = ['WAREHOUSE', 'ADDRESS', 'CONTACT NAME', 'CONTACT INFORMATION'];
    const [displayData, setDisplayData] = useState(() => { return hasSearched ? filteredData : warehouses });

    useEffect(() => {
        return hasSearched ? setDisplayData(filteredData) : setDisplayData(warehouses);
    },[filteredData, warehouses, hasSearched])

    return (
        <main className="warehouses">
            <div className={`warehouses__page-background ${isDeleting ? 'warehouses__page-background--hide' : ''}`}></div>
            <div className={`warehouses__page-foreground ${isDeleting ? 'warehouses__page-foreground--hide' : ''}`}>
                <Hero dataToRender={warehouses} handleClick={handleClick} buttonText="+ Add New Warehouse" addButtonUrl={'/warehouses/add'}/>
                <section className="warehouses__table">
                    <TableHeader labels={tableLabels} handleSort={handleSort}/>
                    {/* use a conditional here to either map searched items, or display no results found IF user searched */}
                    {displayData && displayData.length > 0 ? displayData.map((warehouse) => (
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