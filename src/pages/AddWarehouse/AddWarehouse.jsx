import './addWarehouse.scss';
import { useEffect } from 'react';
import axios from 'axios';
import WarehouseForm from '../../components/WarehouseForm/WarehouseForm';
import { warehousesPageIndex } from '../../data/appData.json';

function AddWarehouse({ setNavIndex, onNavigate }) {
  useEffect(() => {
    setNavIndex(warehousesPageIndex);
  }, [setNavIndex]);

  const handleSubmit = async (formData) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/warehouses",
        formData
      );
      
      if (onNavigate) {
        onNavigate("/");
      }
    } catch (error) {
      console.error("Error creating warehouse:", error);
    }
  };

  return (
    <main className="addwarehouse">
      <WarehouseForm onSubmit={handleSubmit} isEditMode={false} />
    </main>
  );
}

export default AddWarehouse;