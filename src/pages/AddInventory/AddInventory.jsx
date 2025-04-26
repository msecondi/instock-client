import './addInventory.scss';
import { inventoryPageIndex } from "../../data/appData.json"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import ArrowIcon from "../../assets/Icons/arrow_back-24px.svg";

import InventoryForm from '../../components/InventoryForm/InventoryForm';

const AddInventory = ({setNavIndex}) => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  useEffect(() => {
    setNavIndex(inventoryPageIndex);
  }, []);


  const handleSubmit = async (formData) => {
    try {
      setErrorMessage(""); // Clear previous errors
      const response = await axios.post(inventoriesEndpoint, formData);
      navigate("/inventories");
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data);
      } else {
        setErrorMessage("Please check all entered data and try again.");
      }
    }
  };

  function handleCancel() {
    navigate(-1);
  }


  return (
    <div className="add-inventory">
      <div className="add-inventory__page-background" />
      <div className="add-inventory__page-foreground">
        <div className="add-inventory__header">
          <button className="add-inventory__back-button" onClick={handleCancel}>
            <img src={ArrowIcon} alt="Back" />
          </button>
          <h1 className="add-inventory__title">
            Add New Inventory Item
          </h1>
        </div>

        <InventoryForm onSubmit={handleSubmit} isEditMode={false} errorMessage={errorMessage}/>
        
      </div>
    </div>
  );
};


export default AddInventory;