import './editWarehouse.scss';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import WarehouseForm from '../../components/WarehouseForm/WarehouseForm';
import { warehousesEndpoint, warehousesPageIndex } from '../../data/appData.json';

function EditWarehouse({ setNavIndex }) {
  const { id } = useParams();
  const [errorMessage, setErrorMessage] = useState("");
  const [warehouse, setWarehouse] = useState(null);
  const navigate = useNavigate();
  
  // Set navigation index on component mount
  useEffect(() => {
    setNavIndex(warehousesPageIndex);
  }, [setNavIndex]);
  
  // Fetch existing warehouse data
  useEffect(() => {
    const fetchWarehouse = async () => {
      try {
        const response = await axios.get(`${warehousesEndpoint}/${id}`); 
        setWarehouse(response.data);
      } catch (error) {
        console.error('Error fetching warehouse:', error);
      }
    };
    
    fetchWarehouse();
  }, [id]);
  
  const handleSubmit = async (formData) => {
    try {
      // PUT request for updating an existing warehouse
      await axios.patch(`${warehousesEndpoint}/${id}`, formData);
      navigate("/"); // Redirect to the main page after successful update
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data);
      } else {
        setErrorMessage("Please check all entered data and try again.");
      }
    }
  };
  
  return (
    <main className="edit-warehouse">
      <WarehouseForm 
        initialValues={warehouse} // Pre-populate with existing data
        onSubmit={handleSubmit}
        isEditMode={true}
        errorMessage={errorMessage}
      />
    </main>
  );
}

export default EditWarehouse;