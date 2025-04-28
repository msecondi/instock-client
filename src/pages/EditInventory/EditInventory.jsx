import './editInventory.scss';
import { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { inventoryPageIndex } from '../../data/appData.json';
import axios from 'axios';
import ArrowIcon from "../../assets/Icons/arrow_back-24px.svg";
import {warehousesEndpoint, inventoriesEndpoint} from "../../data/appData.json"; 

/**
 * EditInventory component for editing inventory items
 * @param {Object} props - Component props
 * @param {Function} props.setNavIndex - Function to set navigation index
 */
function EditInventory({ setNavIndex }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item_name, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [quantity, setQuantity] = useState("");
  const [warehouse_id, setWarehouseId] = useState("");
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [warehouseOptions, setWarehouseOptions] = useState([]);
  
  // Add validation state
  const [validationErrors, setValidationErrors] = useState({
    item_name: false,
    description: false,
    category: false,
    status: false,
    quantity: false,
    warehouse_id: false
  });
  
  // Track if form was submitted to show validation errors
  const [wasSubmitted, setWasSubmitted] = useState(false);

  /**
   * Convert API format status to component format
   * @param {string} apiStatus - Status from API
   * @returns {string} - Normalized status for component
   */
  const normalizeStatus = useCallback((apiStatus) => {
    if (!apiStatus) return "";
    
    const statusLower = apiStatus.toLowerCase();
    
    if (statusLower === "in stock") return "in-stock";
    if (statusLower === "out of stock") return "out-of-stock";
    
    return statusLower.replace(/\s+/g, '-');
  }, []);

  /**
   * Convert component format status back to API format
   * @param {string} componentStatus - Status in component format
   * @returns {string} - Status in API format
   */
  const denormalizeStatus = useCallback((componentStatus) => {
    if (componentStatus === "in-stock") return "In Stock";
    if (componentStatus === "out-of-stock") return "Out of Stock";
    return componentStatus;
  }, []);

  /**
   * Fetch available warehouses from API
   */
  const fetchWarehouses = useCallback(async () => {
    try {
      const response = await axios.get(`${warehousesEndpoint}`); 
      setWarehouseOptions(response.data);
    } catch (error) {
      console.error("Error fetching warehouses:", error);
      setError("Failed to load warehouses");
    }
  }, []);

  /**
   * Fetch inventory item data from API
   */
  const fetchInventory = useCallback(async () => {
    setIsLoading(true);
    try {
      await fetchWarehouses();
      
      const response = await axios.get(`${inventoriesEndpoint}/${id}`); 

      const data = response.data;
      
      setItemName(data.item_name || "");
      setDescription(data.description || "");
      setCategory(data.category || "");
      setStatus(normalizeStatus(data.status));
      setQuantity(data.quantity?.toString() || "0");
      setWarehouseId(data.warehouse_id || "");
      
      setError(null);
    } catch (error) {
      console.error("Error fetching inventory item:", error);
      setError("Failed to load inventory item");
    } finally {
      setIsLoading(false);
    }
  }, [id, normalizeStatus, fetchWarehouses]);

  useEffect(() => {
    setNavIndex(inventoryPageIndex);
    fetchInventory();
  }, [setNavIndex, fetchInventory]);

  /**
   * Validate all form fields
   * @returns {boolean} - True if form is valid
   */
  const validateForm = useCallback(() => {
    const errors = {
      item_name: !item_name.trim(),
      description: !description.trim(),
      category: !category,
      status: !status,
      quantity: !quantity || Number(quantity) < 0,
      warehouse_id: !warehouse_id
    };
    
    setValidationErrors(errors);
    
    // Form is valid if no errors
    return !Object.values(errors).some(hasError => hasError);
  }, [item_name, description, category, status, quantity, warehouse_id]);

  /**
   * Handle form cancellation
   */
  const handleCancel = () => {
    navigate("/inventories");
  };

  /**
   * Handle form submission to save inventory data
   */
  const handleSave = async () => {
    setWasSubmitted(true);
    
    if (!validateForm()) {
      return; // Don't submit if form is invalid
    }
    
    try {
      await axios.patch(`${inventoriesEndpoint}/${id}`, {
        item_name,
        description,
        category,
        status: denormalizeStatus(status),
        quantity: Number(quantity),
        warehouse_id
      });
      navigate("/inventories");
    } catch (error) {
      console.error("Error updating inventory item:", error.response?.data || error.message);
      setError(error.response?.data?.error || "Failed to update inventory item");
    }
  };

  /**
   * Handle status change for radio buttons
   * @param {string} newStatus - New status value
   */
  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    if (wasSubmitted) {
      setValidationErrors(prev => ({
        ...prev,
        status: !newStatus
      }));
    }
  };

  /**
   * Handle input change and update validation if form was submitted
   * @param {string} field - Field name
   * @param {string} value - New value
   */
  const handleInputChange = (field, value) => {
    switch (field) {
      case 'item_name':
        setItemName(value);
        if (wasSubmitted) {
          setValidationErrors(prev => ({
            ...prev,
            item_name: !value.trim()
          }));
        }
        break;
      case 'description':
        setDescription(value);
        if (wasSubmitted) {
          setValidationErrors(prev => ({
            ...prev,
            description: !value.trim()
          }));
        }
        break;
      case 'category':
        setCategory(value);
        if (wasSubmitted) {
          setValidationErrors(prev => ({
            ...prev,
            category: !value
          }));
        }
        break;
      case 'quantity':
        setQuantity(value);
        if (wasSubmitted) {
          setValidationErrors(prev => ({
            ...prev,
            quantity: !value || Number(value) < 0
          }));
        }
        break;
      case 'warehouse_id':
        setWarehouseId(value);
        if (wasSubmitted) {
          setValidationErrors(prev => ({
            ...prev,
            warehouse_id: !value
          }));
        }
        break;
      default:
        break;
    }
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading">Loading inventory data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
        <div className="error-actions">
          <button className="retry-button" onClick={fetchInventory}>Retry</button>
          <button className="back-button" onClick={() => navigate("/inventories")}>Back to Inventory</button>
        </div>
      </div>
    );
  }

  const isFormValid = item_name && category && warehouse_id && quantity !== "" && status !== "" && description !== "";

  return (
    <main className="edit-inventory">
      <div className="inventory-form-container">
        <div className="inventory-header">
          <button className="back-button" onClick={handleCancel} aria-label="Go back">
            <img src={ArrowIcon} alt="Back" />
          </button>
          <h1 className="inventory_edit__title">Edit Inventory Item</h1>
        </div>

        <div className="inventory-content">
          <section className="inventory-section">
            <h2 className="inventory-form__section--title">Item Details</h2>
            <div className="form-fields">
              <div className="form-group">
                <label htmlFor="item-name" className="item-labels">Item Name</label>
                <input
                  id="item-name"
                  type="text"
                  value={item_name}
                  onChange={(e) => handleInputChange('item_name', e.target.value)}
                  placeholder="Enter item name"
                  required
                  aria-required="true"
                  className={validationErrors.item_name ? "validation-error" : ""}
                />
                {validationErrors.item_name && (
                  <p className="error-text">Item name is required</p>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="description" className="item-labels">Description</label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Enter description"
                  rows={4}
                  aria-label="Item description"
                  required
                  aria-required="true"
                  className={validationErrors.description ? "validation-error" : ""}
                />
                {validationErrors.description && (
                  <p className="error-text">Description is required</p>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="category" className="item-labels">Category</label>
                <div className="select-wrapper">
                  <select
                    id="category"
                    value={category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    required
                    aria-required="true"
                    className={validationErrors.category ? "validation-error" : ""}
                  >
                    <option value="" disabled>Select category</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Books">Books</option>
                  </select>
                </div>
                {validationErrors.category && (
                  <p className="error-text">Category is required</p>
                )}
              </div>
            </div>
          </section>

          <section className="inventory-section">
            <h2 className="inventory-form__section--title">Item Availability</h2>
            <div className="form-fields">
              <div className="form-group">
                  <legend className="item-labels">Status</legend>
                  <div className={`radio-group ${validationErrors.status ? "validation-error" : ""}`}>
                    <div className="radio-option">
                      <input
                        type="radio"
                        id="in-stock"
                        name="status"
                        value="in-stock"
                        checked={status === "in-stock"}
                        onChange={() => handleStatusChange("in-stock")}
                        aria-label="In stock"
                        required
                        aria-required="true"
                      />
                      <label htmlFor="in-stock" className="item-labels">In stock</label>
                    </div>
                    <div className="radio-option">
                      <input
                        type="radio"
                        id="out-of-stock"
                        name="status"
                        value="out-of-stock"
                        checked={status === "out-of-stock"}
                        onChange={() => handleStatusChange("out-of-stock")}
                        aria-label="Out of stock"
                        required
                        aria-required="true"
                      />
                      <label htmlFor="out-of-stock" className="item-labels">Out of stock</label>
                    </div>
                  </div>
                  {validationErrors.status && (
                    <p className="error-text">Status is required</p>
                  )}
              </div>

              <div className="form-group">
                <label htmlFor="quantity" className="item-labels">Quantity</label>
                <input
                  id="quantity"
                  type="number"
                  value={quantity}
                  onChange={(e) => handleInputChange('quantity', e.target.value)}
                  className={`quantity-input ${validationErrors.quantity ? "validation-error" : ""}`}
                  min="0"
                  required
                  aria-required="true"
                />
                {validationErrors.quantity && (
                  <p className="error-text">Quantity must be a non-negative number</p>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="warehouse_id" className="item-labels">Warehouse</label>
                <div className="select-wrapper">
                  <select
                    id="warehouse_id"
                    value={warehouse_id}
                    onChange={(e) => handleInputChange('warehouse_id', e.target.value)}
                    required
                    aria-required="true"
                    className={validationErrors.warehouse_id ? "validation-error" : ""}
                  >
                    <option value="" disabled>Select warehouse</option>
                    {warehouseOptions.map(warehouse => (
                      <option key={warehouse.id} value={warehouse.id}>
                        {warehouse.warehouse_name}
                      </option>
                    ))}
                  </select>
                </div>
                {validationErrors.warehouse_id && (
                  <p className="error-text">Warehouse is required</p>
                )}
              </div>
            </div>
          </section>
        </div>

        <div className="inventory-footer">
          <button 
            className="cancel-button" 
            onClick={handleCancel}
            type="button"
          >
            Cancel
          </button>
          <button 
            className="save-button" 
            onClick={handleSave}
            type="submit"
            disabled={!isFormValid}
          >
            Save
          </button>
        </div>
      </div>
    </main>
  );
}

export default EditInventory;