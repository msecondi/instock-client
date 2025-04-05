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
      // TO DO: Replace with actual API endpoint
      const response = await axios.post(
        "http://localhost:8080/api/warehouses",
        formData
      );
      
      // Navigate using the provided navigation function from parent
      if (onNavigate) {
        onNavigate("/warehouses");
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