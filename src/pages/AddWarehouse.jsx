// src/pages/AddWarehouse/AddWarehouse.jsx

import { useNavigate } from "react-router-dom";
import axios from "axios";
import WarehouseForm from "../../components/WarehouseForm/WarehouseForm";
import "./AddWarehouse.scss";

const AddWarehouse = () => {
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      // TO DO: Replace with actual API endpoint
      const response = await axios.post(
        "http://localhost:8080/api/warehouses",
        formData
      );

      // goes back to warehouses list on successful submission
      navigate("/warehouses");
    } catch (error) {
      console.error("Error creating warehouse:", error);
    }
  };

  return (
    <div className="add-warehouse">
      <WarehouseForm onSubmit={handleSubmit} isEditMode={false} />
    </div>
  );
};

export default AddWarehouse;
