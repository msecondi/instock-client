import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./InventoryForm.scss";
import { warehousesEndpoint, inventoriesEndpoint } from "../../data/appData.json";

import TextFormField from '../../components/TextFormField/TextFormField';
import DropDownFormField from '../../components/DropDownFormField/DropDownFormField';

const InventoryForm = ({ initialValues, onSubmit, isEditMode, errorMessage }) => {
  const navigate = useNavigate();

  const defaultFormValues = {
    item_name: "",
    description: "",
    category: "",
    status: "",
    quantity: "",
    warehouse_id: "",
  };

  const [formValues, setFormValues] = useState(() => {
    if (!initialValues) return defaultFormValues;

    const processedValues = {};
    Object.keys(defaultFormValues).forEach((key) => {
      processedValues[key] = initialValues[key]?.toString() || "";
    });
    return processedValues;
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [categories, setCategories] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [instock, setInstock] = useState(true);

  // Update formValues if initialValues change
  useEffect(() => {
    if (initialValues) {
      const updatedValues = {};
      Object.keys(defaultFormValues).forEach((key) => {
        updatedValues[key] = initialValues[key]?.toString() || "";
      });
      setFormValues(updatedValues);
    }
  }, [initialValues]);

  // Fetch categories and warehouses
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const { data } = await axios.get(`${inventoriesEndpoint}/categories`);
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    const fetchWarehouses = async () => {
      try {
        const { data } = await axios.get(`${warehousesEndpoint}`);
        const warehouseNames = data.map((warehouse) => warehouse.warehouse_name);
        setWarehouses(warehouseNames);
      } catch (error) {
        console.error('Error fetching warehouses:', error);
      }
    };

    fetchCategory();
    fetchWarehouses();
  }, []);

  // Input change handler
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    if (isSubmitted) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: validateField(name, value),
      }));
    }
  };

  // Focus handler
  const handleFocus = (event) => {
    const { name } = event.target;
    setTouched((prevTouched) => ({
      ...prevTouched,
      [name]: true,
    }));
  };

  // Status change handler (in stock / out of stock)
  const handleStatusChange = (status) => {
    setInstock(status);
    if (!status) {
      setFormValues((prevValues) => ({
        ...prevValues,
        quantity: '0',
      }));
    }
  };

  // Validation functions
  const validateField = (name, value) => {
    if (name === "id") return "";
    if (!value || !value.trim()) return "This field is required";
    return "";
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    Object.entries(formValues).forEach(([key, value]) => {
      const error = validateField(key, value);
      newErrors[key] = error;
      if (error) isValid = false;
    });

    setErrors(newErrors);
    return isValid;
  };

  const hasErrors = () => {
    return Object.values(errors).some((error) => error !== "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (validateForm()) {
      onSubmit(formValues);
    }
  };

  const handleCancel = () => {
    navigate("/inventories");
  };

  return (
    <form onSubmit={handleSubmit} className="inventory-form">
      <section className="inventory-form__section">
        <h2 className="inventory-form__section--title">Item Details</h2>
        {errorMessage && (
          <p className="inventory-form__section--error">{errorMessage}</p>
        )}

        <div className="inventory-form__section--field">
          <label htmlFor="item_name">Item Name</label>
          <input
            type="text"
            id="item_name"
            name="item_name"
            className={`inventory-form__section--input ${
              isSubmitted && errors.item_name ? "inventory-form__section--input-error" : ""
            } ${touched.item_name ? "inventory-form__section--input-active" : ""}`}
            value={formValues.item_name}
            onChange={handleChange}
            onFocus={handleFocus}
            placeholder="Item Name"
          />
          {isSubmitted && errors.item_name && (
            <p className="inventory-form__section--error">{errors.item_name}</p>
          )}
        </div>

        <div className="inventory-form__section--field">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            className={`inventory-form__section--input inventory-form__section--textarea ${
              isSubmitted && errors.description ? "inventory-form__section--input-error" : ""
            } ${touched.description ? "inventory-form__section--input-active" : ""}`}
            value={formValues.description}
            onChange={handleChange}
            onFocus={handleFocus}
            placeholder="Please enter a brief description..."
          />
          {isSubmitted && errors.description && (
            <p className="inventory-form__section--error">{errors.description}</p>
          )}
        </div>

        <div className="inventory-form__section--field">
          <label htmlFor="category">Category</label>
          <DropDownFormField
            dropDownItems={categories.length ? categories : ["No categories found"]}
            placeHolder="Please select"
            isError={errors.category}
          />
        </div>
      </section>

      <section className="inventory-form__section">
        <h2 className="inventory-form__section--title">Item Availability</h2>

        <div className="inventory-form__section--field radio-field">
          <label htmlFor="status">Status</label>
          <div className="radio-options">
            <div className="radio-options__indiv">
              <input
                type="radio"
                id="in-stock"
                name="status"
                value="in-stock"
                onChange={() => handleStatusChange(true)}
                required
              />
              <label htmlFor="in-stock" className="item-labels">In stock</label>
            </div>

            <div className="radio-options__indiv">
              <input
                type="radio"
                id="out-of-stock"
                name="status"
                value="out-of-stock"
                onChange={() => handleStatusChange(false)}
                required
              />
              <label htmlFor="out-of-stock" className="item-labels">Out of stock</label>
            </div>
          </div>
        </div>

        {instock && ( //if instock is false, will hide entire div
          <div className="inventory-form__section--field">
            <label htmlFor="quantity">Quantity</label>
            <input
              type="text"
              id="quantity"
              name="quantity"
              className={`inventory-form__section--input ${
                isSubmitted && errors.quantity ? "inventory-form__section--input-error" : ""
              } ${touched.quantity ? "inventory-form__section--input-active" : ""}`}
              value={formValues.quantity}
              onChange={handleChange}
              onFocus={handleFocus}
              placeholder="0"
            />
            {isSubmitted && errors.quantity && (
              <p className="inventory-form__section--error">{errors.quantity}</p>
            )}
          </div>
        )}

        <div className="inventory-form__section--field">
          <label htmlFor="warehouse">Warehouse</label>
          <DropDownFormField
            dropDownItems={warehouses.length ? warehouses : ["No warehouses found"]}
            placeHolder="Please select"
            isError={errors.warehouse_id}
          />
        </div>
      </section>

      <div className="inventory-form__actions">
        <button
          type="button"
          className="inventory-form__button inventory-form__button--cancel"
          onClick={handleCancel}
        >
          Cancel
        </button>

        <button
          type="submit"
          className="inventory-form__button inventory-form__button--save"
          disabled={isSubmitted && hasErrors()}
        >
          {isEditMode ? "Save" : "+ Add inventory"}
        </button>
      </div>
    </form>
  );
};

export default InventoryForm;
