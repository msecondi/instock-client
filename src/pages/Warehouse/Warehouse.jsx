import './Warehouse.scss';
import { useEffect } from 'react';
import { warehousesPageIndex } from '../../data/appData.json';

function Warehouse({setNavIndex}) {
  useEffect(() => {
      setNavIndex(warehousesPageIndex);
  }, []);
  
  return (
    <main className="warehouse">

    </main>
  );
};

export default Warehouse;