import './editWarehouse.scss';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import WarehouseForm from '../../components/WarehouseForm/WarehouseForm';
import { warehousesPageIndex } from '../../data/appData.json';

function EditWarehouse({ setNavIndex, onNavigate }) {
  const { id } = useParams();
  const [warehouse, setWarehouse] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Set navigation index on component mount
  useEffect(() => {
    setNavIndex(warehousesPageIndex);
  }, [setNavIndex]);
  
  // Fetch existing warehouse data
  useEffect(() => {
    const fetchWarehouse = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await axios.get(`http://localhost:8080/api/warehouses/${id}`);
        setWarehouse(response.data);
      } catch (error) {
        console.error('Error fetching warehouse:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchWarehouse();
  }, [id]);
  
  const handleSubmit = async (formData) => {
    try {
      // PUT request for updating an existing warehouse
      await axios.put(`http://localhost:8080/api/warehouses/${id}`, formData);
      
      // Navigate using the provided navigation function from parent
      if (onNavigate) {
        onNavigate('/');
      }
    } catch (error) {
      console.error('Error updating warehouse:', error);
    }
  };
  
  return (
    <main className="edit-warehouse">
      <WarehouseForm 
        initialValues={warehouse} // Pre-populate with existing data
        onSubmit={handleSubmit}
        isEditMode={true}
      />
    </main>
  );
}

export default EditWarehouse;