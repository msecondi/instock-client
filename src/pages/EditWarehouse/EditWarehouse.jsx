import './editWarehouse.scss';
import { useEffect } from 'react';
import { warehousesPageIndex } from '../../data/appData.json';

function EditWarehouse({setNavIndex}) {
  useEffect(() => {
      setNavIndex(warehousesPageIndex);
  }, []);

  return (
    <main className="edit-warehouse">

    </main>
  );
};

export default EditWarehouse;