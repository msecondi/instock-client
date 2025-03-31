import './warehouse.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { warehousesEndpoint, warehousesPageIndex } from '../../data/appData.json';
import { v4 as uuidv4 } from 'uuid';
import HeroWhDetails from '../../components/HeroWhDetails/HeroWhDetails';
import TableHeaderWhDetails from '../../components/TableHeaderWhDetails/TableHeaderWhDetails';
import TableRow from '../../components/TableRow/TableRow';

function Warehouses({setNavIndex}) {
    useEffect(() => {
        setNavIndex(warehousesPageIndex);
    }, []);

    const {id} = useParams();
    const [warehouse, setWarehouse] = useState([]);

    const fetchWarehouse = async () => {
        try {
            const warehouseResponse = await axios.get(`${warehousesEndpoint}/${id}`);
            setWarehouse(warehouseResponse.data);
        } catch (error) {
            console.log(`Could not load warehouses: ${error}`);
        }
    }

    useEffect( () => { fetchWarehouse(); }, []);
    console.log(warehouse);

    return (
        <main className="warehouses">
            <div className="warehouses__page-background">

            </div>
            <div className="warehouses__page-foreground">
                <HeroWhDetails heroTitle={warehouse.warehouse_name} id={id}/>
                <section className="warehouses__table">
                    <TableHeaderWhDetails />
                </section>
            </div>
        </main>
    );
}

export default Warehouses;