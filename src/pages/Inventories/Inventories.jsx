import './inventories.scss';
import { useEffect } from 'react';
import { inventoryPageIndex } from '../../data/appData.json';
import Hero from '../../components/Hero/Hero';
import TableHeader from '../../components/TableHeader/TableHeader';

function Inventories({setNavIndex}) {
    useEffect(() => {
        setNavIndex(inventoryPageIndex);
    }, []);

    const tableLabels = ['INVENTORY ITEM', 'CATEGORY', 'STATUS', 'QTY', 'WAREHOUSE'];

    return (
        <main className="inventories">
            <div className="inventories__page-background"></div>
            <div className="inventories__page-foreground">
                <Hero heroTitle="Inventory" buttonText="+ Add New Item" addButtonUrl={'/inventories/add'}/>
                <section className="inventories__table">
                    <TableHeader labels={tableLabels} />
                </section>
            </div>
        </main>
    );
}

export default Inventories;