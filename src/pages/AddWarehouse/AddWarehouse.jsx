import "./addWarehouse.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import WarehouseForm from "../../components/WarehouseForm/WarehouseForm";
import { warehousesEndpoint, warehousesPageIndex } from "../../data/appData.json";

function AddWarehouse({ setNavIndex }) {
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      setErrorMessage(""); // Clear previous errors
      const response = await axios.post(warehousesEndpoint, formData);
      navigate("/");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message); // Set error message from response
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <main className="addwarehouse">
      <WarehouseForm onSubmit={handleSubmit} isEditMode={false} errorMessage={errorMessage} />
    </main>
  );
}

export default AddWarehouse;
