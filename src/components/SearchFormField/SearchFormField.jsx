import './searchFormField.scss';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { warehousesEndpoint } from "../../data/appData.json";
import SearchIcon from '../../assets/icons/search-24px.svg';

const SearchFormField = ({searchContext, handleClick}) => {
    const [searchText, setSearchText] = useState('');
    const [baseData, setBaseData] = useState([]);
    const [currentData, setCurrentData] = useState([]);
    const [isActive, setIsActive] = useState(false);
    
    const inputOnFocus = () => {
        setIsActive(true);
    }
    const inputOnBlur = () => {
        setIsActive(false);
    }
    
    const search = (event) => {
        setSearchText(event.target.value);
    }
    const handleEnter = (event) => {
        if (event.key === 'Enter') {
            handleClick(currentData);
        }
    }

    //create warehouses state variable to convert ids to names when rendering inventories
    const [warehouses, setWarehouses] = useState([]);

    useEffect(() => {
        const fetchWarehouses = async() => {
            const response = await axios.get(`${warehousesEndpoint}`);
            setWarehouses(response.data);
        }
        fetchWarehouses();
    }, [])

    useEffect(() => {
        //if warehouse_id exists, then we are loading inventories
        //therefore we need to convert warehouse_id into a usable name for the user to search through
        if (searchContext[0]?.warehouse_id && warehouses.length > 0) {
            
            //find id in warehouses and enrich data to also contain the associated warehouse_name
            const enrichedData = searchContext.map(inventoryObj => {
                //within the loop, at each individual inventory object, find and assign matching ids and store in variable
                const warehouse = warehouses.find(warehouseObj => warehouseObj.id === inventoryObj.warehouse_id);
                //return 'searchContext' but with an additional 'warehouse_name' key with associated data
                return {
                    ...inventoryObj,
                    warehouse_name: warehouse?.warehouse_name || 'Unknown'
                };
            });
            setBaseData(enrichedData);
            setCurrentData(enrichedData);
        } else {
            setBaseData(searchContext);
            setCurrentData(searchContext);
          }
    }, [searchContext, warehouses])

    useEffect(() => {
        if (!searchText.trim()) {
            setCurrentData(baseData); // Show all if empty
            return;
        }
        const filtered = baseData.filter(obj => {
            return Object.entries(obj).some(([key, val]) => {
                if(baseData[0]?.warehouse_id){
                    //ensure we only search required keys when rendering Inventories Page
                    if(key === 'item_name' || key === 'category' || key === 'description' || key === 'warehouse_name')
                        return val.toString().toLowerCase().includes(searchText.toLowerCase())
                }
                else {
                    // otherwise, search all fields for Warehouses Page
                    return val.toString().toLowerCase().includes(searchText.toLowerCase())
                }
            });
        });
        setCurrentData(filtered);
    }, [searchText, baseData]);

    return (
        <div className={`search ${isActive ? 'search--active-border' : ''}`}>
            <input className="search__input" type="text" placeholder="Search..." onFocus={inputOnFocus} onBlur={inputOnBlur} onChange={search} onKeyDown={handleEnter}/> 
            <button className="search__button" type="button" onClick={() => handleClick(currentData)}>
                <img className="search__icon" src={SearchIcon} alt="Search Icon" />
            </button>
        </div>
    );
};

export default SearchFormField;