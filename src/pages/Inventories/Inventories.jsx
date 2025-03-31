import './inventories.scss';
import { useEffect } from 'react';
import { inventoryPageIndex } from '../../data/appData.json';
import Hero from '../../components/Hero/Hero';
import TableHeader from '../../components/TableHeader/TableHeader';

function Inventories({setNavIndex}) {
    useEffect(() => {
        setNavIndex(inventoryPageIndex);
    }, []);

    return (
        <main className="inventories">
            <div className="inventories__page-background"></div>
            <div className="inventories__page-foreground">
                <Hero heroTitle="Inventory" buttonText="+ Add New Item"/>
                <section className="inventories__table">
                    <TableHeader />
                </section>
            </div>
        </main>
    );
}

export default Inventories;