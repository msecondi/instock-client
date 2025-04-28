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
    warehouse_id: "",
    item_name: "",
    description: "",
    category: "",
    status: "",
    quantity: ""
  };

  //dropdown states
  const [selectedWarehouse, setSelectedWarehouse] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(() => {
    if (!initialValues) return "";
    return initialValues.category;
  });

  const [formValues, setFormValues] = useState(() => {
    if (!initialValues) return defaultFormValues; //problem not recognizing initialValues

    const processedValues = {};
    Object.keys(defaultFormValues).forEach((key) => {
        processedValues[key] = initialValues[key]?.toString() || "";
    });
    Object.keys(initialValues).forEach((key) => {
        if(key === 'warehouse_name') {
            return processedValues.warehouse_id = Object.entries(warehouses).find(warehouse => warehouse[1] === selectedWarehouse)
        }
    });
    console.log(processedValues)
    return processedValues;
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [categories, setCategories] = useState([]);
  const [warehouses, setWarehouses] = useState({});
  const [instock, setInstock] = useState(true);

  // Update formValues if initialValues change
  useEffect(() => {
    if (initialValues) {
      const updatedValues = {};
      Object.keys(defaultFormValues).forEach((key) => {
        if(key === 'id') {
            return;
        }
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
        const warehouseObj = data.reduce((acc, warehouse) => {
            acc[warehouse.id] = warehouse.warehouse_name;
            return acc;
          }, {});
        setWarehouses(warehouseObj);
      } catch (error) {
        console.error('Error fetching warehouses:', error);
      }
    };

    fetchCategory();
    fetchWarehouses();
  }, []);

  //for ongoing validation 
  useEffect(() => {
    const newErrors = {};
  
    Object.entries(formValues).forEach(([key, value]) => {
      const error = validateField(key, value);
      if (error) {
        newErrors[key] = error;
      }
    });
    console.log(formValues)
    setErrors(newErrors);
  }, [formValues]);

  
  useEffect(() => {
    if (initialValues) {
        if (Object.keys(warehouses).length) {
            // const warehouseName = warehouses[initialValues.id];
            const warehouseName = Object.entries(warehouses).find(warehouse => warehouse[1] === initialValues.warehouse_name);
            if (warehouseName) {
                setSelectedWarehouse(warehouseName[1]);
                // formValues.warehouse_id = warehouseName[0];
            }
        }
        if (categories.length) {
            setSelectedCategory(initialValues.category);
        }
    }
  }, [initialValues, warehouses, categories]);

  // Input change handler
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    setTouched((prevTouched) => ({
        ...prevTouched,
        [name]: true,
      }));
  };

  // Focus handler
  const handleFocus = (event) => {
    const { name } = event.target;
    setTouched((prevTouched) => ({
      ...prevTouched,
      [name]: true,
    }));
  };
  //user no longer 'touching' current form
  const handleBlur = (event) => {
    const { name } = event.target;
    setTouched((prevTouched) => ({
      ...prevTouched,
      [name]: false,
    }));
  };

  // Status change handler (in stock / out of stock)
  const handleStatusChange = (status) => {
    setInstock(status);
    if (!status) {
      setFormValues((prevValues) => ({
        ...prevValues,
        status: 'Out of Stock',
        quantity: '0',
      }));
    } else {
        setFormValues((prevValues) => ({
            ...prevValues,
            status: 'In Stock',
            quantity: (initialValues.quantity.toString())
        }));
    }
  };

  // Validation functions
  const validateField = (name, value) => {
    if (name === "id") return "";
    if (formValues.status === 'In Stock' && name === 'quantity' && (isNaN(parseInt(value)) || parseInt(value) <= 0)) {
        return "Quantity must be a number greater than 0 if item is 'In stock'";
    }
    if (!value || !value.trim()) return "This field is required";
    return "";
  };

  const hasErrors = () => {
    return Object.values(errors).some((error) => error !== "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!hasErrors()) {
        // formValues.quantity = formValues.quantity.toString();
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
               touched.item_name && errors.item_name ? "inventory-form__section--input-error" : ""
            } ${touched.item_name ? "inventory-form__section--input-active" : ""}`}
            value={formValues.item_name}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder="Item Name"
          />
          {touched.item_name && errors.item_name && (
            <p className="inventory-form__section--error">{errors.item_name}</p>
          )}
        </div>

        <div className="inventory-form__section--field">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            className={`inventory-form__section--input inventory-form__section--textarea ${
              touched.description && errors.description ? "inventory-form__section--input-error" : ""
            } ${touched.description ? "inventory-form__section--input-active" : ""}`}
            value={formValues.description}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder="Please enter a brief description..."
          />
          {touched.description && errors.description && (
            <p className="inventory-form__section--error">{errors.description}</p>
          )}
        </div>

        <div className="inventory-form__section--field">
          <label htmlFor="category">Category</label>
          <DropDownFormField
            dropDownItems={categories.length ? categories : ["No categories found"]}
            placeHolder={"Please select"}
            setInputText={setSelectedCategory}
            value={selectedCategory}
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
                checked={formValues.status === "In Stock"}
                onChange={() => handleStatusChange(true)}
                onFocus={handleFocus}
                onBlur={handleBlur}
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
                checked={formValues.status === "Out of Stock"}
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
                touched.quantity && errors.quantity ? "inventory-form__section--input-error" : ""
              } ${touched.quantity ? "inventory-form__section--input-active" : ""}`}
              value={formValues.quantity}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder="0"
            />
            { touched.quantity && errors.quantity && (
              <p className="inventory-form__section--error">{errors.quantity}</p>
            )}
          </div>
        )}

        <div className="inventory-form__section--field">
          <label htmlFor="warehouse">Warehouse</label>
          <DropDownFormField
            dropDownItems={Object.values(warehouses).length ? Object.values(warehouses) : ["No warehouses found"]}
            placeHolder={"Please select"}
            value={selectedWarehouse}
            setInputText={setSelectedWarehouse}
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
          disabled={hasErrors()}
        >
          {isEditMode ? "Save" : "+ Add Item"}
        </button>
      </div>
    </form>
  );
};

export default InventoryForm;
