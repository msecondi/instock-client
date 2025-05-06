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
    const [filteredData, setFilteredData] = useState(null);
    const [hasSearched, setHasSearched] = useState(false);
    const [searchText, setSearchText] = useState('');
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

    const handleClick = (filteredResults, searchText) => {
        setFilteredData(filteredResults);
        setSearchText(searchText);
        setHasSearched(true)
    };

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
            const response = await axios.get(`${inventoriesEndpoint}/sort/${columnName}/order/${newOrder}`);
            //check if user has searched. If they have, filter the sorted response.data using the already filtered search data then set it to filteredData
            if (hasSearched) {
                const filteredIds = filteredData.map(item => item.id);
                const reFiltered = response.data.filter(item => filteredIds.includes(item.id));
                setFilteredData(reFiltered);
            } else {
                setInventories(response.data);
            }
        }
        catch(error) {
            console.error(error);
        }
    }

    const tableLabels = ['INVENTORY ITEM', 'CATEGORY', 'STATUS', 'QTY', 'WAREHOUSE'];
    const [displayData, setDisplayData] = useState(() => { return hasSearched ? filteredData : inventories });

    useEffect(() => {
        return hasSearched ? setDisplayData(filteredData) : setDisplayData(inventories);
    },[filteredData, inventories, hasSearched])

    return (
        <main className="inventories">
            <div className={`inventories__page-background ${isDeleting ? 'inventories__page-foreground--hide' : ''}`}></div>
            <div className={`inventories__page-foreground ${isDeleting ? 'inventories__page-foreground--hide' : ''}`}>
                <Hero dataToRender={inventories} handleClick={handleClick} buttonText="+ Add New Item" addButtonUrl={'/inventories/add'}/>
                <section className="inventories__table">
                    <TableHeader labels={tableLabels} handleSort={handleSort} />
                    {/* use a conditional here to either map searched items, or display no results found IF user searched */}
                    {displayData.length > 0 ? displayData.map((inventory) => (
                        <TableRowInventory inventory={inventory} showWarehouse={true} key={uuidv4()} />
                    )) : hasSearched ?
                    <div className="inventories__table--no-results">
                            No inventory items match your search. Please try again.
                    </div> : null
                    }
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