import "./addWarehouse.scss";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import WarehouseForm from "../../components/WarehouseForm/WarehouseForm";
import { warehousesEndpoint, warehousesPageIndex } from "../../data/appData.json";

function AddWarehouse({ setNavIndex }) {
  useEffect(() => {
    setNavIndex(warehousesPageIndex);
  }, [setNavIndex]);
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      const response = await axios.post(warehousesEndpoint, formData);
      navigate("/");
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
