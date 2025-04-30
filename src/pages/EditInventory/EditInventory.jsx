import './editInventory.scss';
import { inventoriesEndpoint, inventoryPageIndex } from "../../data/appData.json"
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import ArrowIcon from "../../assets/Icons/arrow_back-24px.svg";

import InventoryForm from '../../components/InventoryForm/InventoryForm';

const EditInventory = ({setNavIndex}) => {
  const navigate = useNavigate();
  const {id} = useParams();
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const [invItem, setInvItem] = useState(null);

  useEffect(() => {
    setNavIndex(inventoryPageIndex);
  }, []);

  // Fetch existing inventory item data
  useEffect(() => {
    const fetchInvItem = async () => {
      try {
        const response = await axios.get(`${inventoriesEndpoint}/${id}`);
        setInvItem(response.data);
      } catch (error) {
        console.error("Error fetching inventory item:", error);
      }
    };

    fetchInvItem();
  }, [id]);


  const handleSubmit = async (formData) => {
    try {
      setErrorMessage(""); // Clear previous errors
      await axios.patch(`${inventoriesEndpoint}/${id}`, formData);
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
    <div className="edit-inventory">
      <div className="edit-inventory__page-background" />
      <div className="edit-inventory__page-foreground">
        <div className="edit-inventory__header">
          <h1 className="edit-inventory__title">
            <button className="edit-inventory__back-button" onClick={handleCancel}>
              <img src={ArrowIcon} alt="Back" />
            </button>
            Edit Inventory Item
          </h1>
        </div>

        <InventoryForm initialValues={invItem} onSubmit={handleSubmit} isEditMode={true} errorMessage={errorMessage}/>
        
      </div>
    </div>
  );
};

export default EditInventory;