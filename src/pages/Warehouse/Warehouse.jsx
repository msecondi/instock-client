import './warehouse.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { warehousesEndpoint, warehousesPageIndex } from '../../data/appData.json';
import { v4 as uuidv4 } from 'uuid';
import HeroWhDetails from '../../components/HeroWhDetails/HeroWhDetails';
import WhDetails from '../../components/WhDetails/WhDetails';
import TableHeader from '../../components/TableHeader/TableHeader';
import TableRowInventory from '../../components/TableRowInventory/TableRowInventory';

function Warehouses({setNavIndex}) {
    useEffect(() => {
        setNavIndex(warehousesPageIndex);
    }, []);

    const {id} = useParams();
    const [warehouseDetails, setWarehouseDetails] = useState([]);
    const [warehouseInventory, setWarehouseInventory] = useState([]);

    const fetchWarehouseDetails = async () => {
        try {
            const warehouseResponse = await axios.get(`${warehousesEndpoint}/${id}`);
            setWarehouseDetails(warehouseResponse.data);
        } catch (error) {
            console.log(`Could not load warehouses details: ${error}`);
        }
    }

    const fetchWarehouseInventory = async () => {
        try {
            const warehouseInventoryResponse = await axios.get(`${warehousesEndpoint}/${id}/inventories`);
            setWarehouseInventory(warehouseInventoryResponse.data);
        } catch (error) {
            console.log(`Could not load warehouse inventory: ${error}`);
        }
    }

    const renderInventory = () => {
        return warehouseInventory.map((inventory) => {
            return (
                <TableRowInventory inventory={inventory} key={uuidv4()}/>
            );
        });
    }

    useEffect( () => { 
        fetchWarehouseDetails(); 
        fetchWarehouseInventory();
    }, []);

    const tableLabels = ['INVENTORY ITEM', 'CATEGORY', 'STATUS', 'QUANTITY'];

    return (
        <main className="warehouses">
            <div className="warehouses__page-background">

            </div>
            <div className="warehouses__page-foreground">
                <HeroWhDetails heroTitle={warehouseDetails.warehouse_name} id={id}/>
                <WhDetails warehouseDetails={warehouseDetails} />
                <section className="warehouses__table">
                    <TableHeader labels={tableLabels}/>
                    {renderInventory()}
                </section>
            </div>
        </main>
    );
}

export default Warehouses;