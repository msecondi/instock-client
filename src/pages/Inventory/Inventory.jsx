import './inventory.scss';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { inventoriesEndpoint, inventoryPageIndex } from '../../data/appData.json';
import HeroInvDetails from '../../components/HeroInvDetails/HeroInvDetails';
import InvDetails from '../../components/InvDetails/InvDetails';

function Inventory({setNavIndex}) {
    useEffect(() => {
        setNavIndex(inventoryPageIndex);
    }, []);

    const {id} = useParams();
    const [invItemDetails, setInvItemDetails] = useState([]);

    const fetchinvItemDetails = async () => {
        try {
            const invItemResponse = await axios.get(`${inventoriesEndpoint}/${id}`);
            setInvItemDetails(invItemResponse.data);
        } catch (error) {
            console.log(`Could not load inventory item details: ${error}`);
        }
    }
    useEffect(() => {
        fetchinvItemDetails()
    }, []);

    return (
        <main className="inventory">
            <div className="inventory__page-background" />
            <div className="inventory__page-foreground">
                <HeroInvDetails heroTitle={invItemDetails.item_name} id={id}/>
                <InvDetails inventoryDetails={invItemDetails} />
            </div>
        </main>
    );
}

export default Inventory;