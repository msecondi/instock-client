import './addWarehouse.scss';
import { useEffect } from 'react';
import { warehousesPageIndex } from '../../data/appData.json';

function AddWarehouse({setNavIndex}) {
  useEffect(() => {
    setNavIndex(warehousesPageIndex);
  }, []);

  return (
    <main className="Add-warehouse">

    </main>
  );
};

export default AddWarehouse;