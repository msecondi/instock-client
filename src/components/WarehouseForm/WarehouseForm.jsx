import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./WarehouseForm.scss";
import ArrowIcon from "../../assets/Icons/arrow_back-24px.svg";

const WarehouseForm = ({ initialValues, onSubmit, isEditMode }) => {
  const navigate = useNavigate();

  const defaultFormValues = {
    warehouse_name: "",
    stree_address: "",
    city: "",
    country: "",
    contact_name: "",
    contact_position: "",
    contact_phone: "",
    contact_email: "",
  };

  // Form states
  const [formValues, setFormValues] = useState(
    initialValues || defaultFormValues
  );
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Update form when initialValues change (for edit mode)
  useEffect(() => {
    if (initialValues) {
      setFormValues(initialValues);
    }
  }, [initialValues]);

  // Handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  // Handle focus events
  const handleFocus = (event) => {
    const { name } = event.target;
    setTouched({
      ...touched,
      [name]: true,
    });
  };

  // Validation logic
  const validateField = (name, value) => {
    if (!value.trim()) return "This field is required";

    if (name === "contact_phone") {
      // Basic phone validation found online
      const phoneRegex = /^\+?\d.*$/; 
      if (!phoneRegex.test(value)) return "Please enter a valid phone number";
    }

    if (name === "contact_email") {
      // Basic email validation found online
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) return "Please enter a valid email address";
    }

    return "";
  };

  // Validate all fields
  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Validate each field
    Object.keys(formValues).forEach((name) => {
      const error = validateField(name, formValues[name]);
      newErrors[name] = error;
      if (error) isValid = false;
    });

    setErrors(newErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (validateForm()) {
      onSubmit(formValues);
    }
  };

  // Handle cancel
  const handleCancel = () => {
    navigate("/warehouses");
  };

  // Check if form has any errors
  const hasErrors = () => {
    return Object.values(errors).some((error) => error !== "");
  };

  return (
    <div className="warehouse-form">
      <div className="warehouse-form__header">
        <button className="warehouse-form__back-button" onClick={handleCancel}>
          <img src={ArrowIcon} alt="Back" />
        </button>
        <h1 className="warehouse-form__title">
          {isEditMode ? "Edit Warehouse" : "Add New Warehouse"}
        </h1>
      </div>

      <form onSubmit={handleSubmit}>
        <section className="warehouse-form__section">
          <h2 className="warehouse-form__section-title">Warehouse Details</h2>

          <div className="warehouse-form__field">
            <label htmlFor="warehouse_name">Warehouse Name</label>
            <input
              type="text"
              id="warehouse_name"
              name="warehouse_name"
              className={`warehouse-form__input ${
                isSubmitted && errors.warehouse_name
                  ? "warehouse-form__input--error"
                  : ""
              } ${
                touched.warehouse_name ? "warehouse-form__input--active" : ""
              }`}
              value={formValues.warehouse_name}
              onChange={handleChange}
              onFocus={handleFocus}
              placeholder="Warehouse Name"
            />
            {isSubmitted && errors.warehouse_name && (
              <p className="warehouse-form__error">{errors.warehouse_name}</p>
            )}
          </div>

          <div className="warehouse-form__field">
            <label htmlFor="address">Street Address</label>
            <input
              type="text"
              id="address"
              name="address"
              className={`warehouse-form__input ${
                isSubmitted && errors.address
                  ? "warehouse-form__input--error"
                  : ""
              } ${touched.address ? "warehouse-form__input--active" : ""}`}
              value={formValues.address}
              onChange={handleChange}
              onFocus={handleFocus}
              placeholder="Street Address"
            />
            {isSubmitted && errors.address && (
              <p className="warehouse-form__error">{errors.address}</p>
            )}
          </div>

          <div className="warehouse-form__field">
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="city"
              className={`warehouse-form__input ${
                isSubmitted && errors.city ? "warehouse-form__input--error" : ""
              } ${touched.city ? "warehouse-form__input--active" : ""}`}
              value={formValues.city}
              onChange={handleChange}
              onFocus={handleFocus}
              placeholder="City"
            />
            {isSubmitted && errors.city && (
              <p className="warehouse-form__error">{errors.city}</p>
            )}
          </div>

          <div className="warehouse-form__field">
            <label htmlFor="country">Country</label>
            <input
              type="text"
              id="country"
              name="country"
              className={`warehouse-form__input ${
                isSubmitted && errors.country
                  ? "warehouse-form__input--error"
                  : ""
              } ${touched.country ? "warehouse-form__input--active" : ""}`}
              value={formValues.country}
              onChange={handleChange}
              onFocus={handleFocus}
              placeholder="Country"
            />
            {isSubmitted && errors.country && (
              <p className="warehouse-form__error">{errors.country}</p>
            )}
          </div>
        </section>

        <section className="warehouse-form__section">
          <h2 className="warehouse-form__section-title">Contact Details</h2>

          <div className="warehouse-form__field">
            <label htmlFor="contact_name">Contact Name</label>
            <input
              type="text"
              id="contact_name"
              name="contact_name"
              className={`warehouse-form__input ${
                isSubmitted && errors.contact_name
                  ? "warehouse-form__input--error"
                  : ""
              } ${touched.contact_name ? "warehouse-form__input--active" : ""}`}
              value={formValues.contact_name}
              onChange={handleChange}
              onFocus={handleFocus}
              placeholder="Contact Name"
            />
            {isSubmitted && errors.contact_name && (
              <p className="warehouse-form__error">{errors.contact_name}</p>
            )}
          </div>

          <div className="warehouse-form__field">
            <label htmlFor="contact_position">Position</label>
            <input
              type="text"
              id="contact_position"
              name="contact_position"
              className={`warehouse-form__input ${
                isSubmitted && errors.contact_position
                  ? "warehouse-form__input--error"
                  : ""
              } ${
                touched.contact_position ? "warehouse-form__input--active" : ""
              }`}
              value={formValues.contact_position}
              onChange={handleChange}
              onFocus={handleFocus}
              placeholder="Position"
            />
            {isSubmitted && errors.contact_position && (
              <p className="warehouse-form__error">{errors.contact_position}</p>
            )}
          </div>

          <div className="warehouse-form__field">
            <label htmlFor="contact_phone">Phone Number</label>
            <input
              type="tel"
              id="contact_phone"
              name="contact_phone"
              className={`warehouse-form__input ${
                isSubmitted && errors.contact_phone
                  ? "warehouse-form__input--error"
                  : ""
              } ${
                touched.contact_phone ? "warehouse-form__input--active" : ""
              }`}
              value={formValues.contact_phone}
              onChange={handleChange}
              onFocus={handleFocus}
              placeholder="Phone Number"
            />
            {isSubmitted && errors.contact_phone && (
              <p className="warehouse-form__error">{errors.contact_phone}</p>
            )}
          </div>

          <div className="warehouse-form__field">
            <label htmlFor="contact_email">Email</label>
            <input
              type="email"
              id="contact_email"
              name="contact_email"
              className={`warehouse-form__input ${
                isSubmitted && errors.contact_email
                  ? "warehouse-form__input--error"
                  : ""
              } ${
                touched.contact_email ? "warehouse-form__input--active" : ""
              }`}
              value={formValues.contact_email}
              onChange={handleChange}
              onFocus={handleFocus}
              placeholder="Email"
            />
            {isSubmitted && errors.contact_email && (
              <p className="warehouse-form__error">{errors.contact_email}</p>
            )}
          </div>
        </section>

        <div className="warehouse-form__actions">
          <button
            type="button"
            className="warehouse-form__button warehouse-form__button--cancel"
            onClick={handleCancel}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="warehouse-form__button warehouse-form__button--save"
            disabled={isSubmitted && hasErrors()}
          >
            {isEditMode ? "Save" : "+ Add Warehouse"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default WarehouseForm;
