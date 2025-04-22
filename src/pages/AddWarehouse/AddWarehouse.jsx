import "./addWarehouse.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import WarehouseForm from "../../components/WarehouseForm/WarehouseForm";
import { warehousesEndpoint, warehousesPageIndex } from "../../data/appData.json";

function AddWarehouse({ setNavIndex }) {
  const [errorMessage, setErrorMessage] = useState(""); // State for error message so I can pass it as a prop to the form
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      setErrorMessage(""); // Clear previous errors
      const response = await axios.post(warehousesEndpoint, formData);
      navigate("/");
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data);
      } else {
        setErrorMessage("Please check all entered data and try again.");
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
