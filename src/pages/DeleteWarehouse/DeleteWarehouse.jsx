import './deleteWarehouse.scss';
import { useEffect } from 'react';
import { warehousesPageIndex } from '../../data/appData.json';

function DeleteWarehouse({setNavIndex}) {
  useEffect(() => {
    setNavIndex(warehousesPageIndex);
  }, []); 

  return (
    <main className="Delete-warehouse">

    </main>
  );
};

export default DeleteWarehouse;