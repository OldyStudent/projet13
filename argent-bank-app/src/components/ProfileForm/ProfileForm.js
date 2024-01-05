import "./ProfileForm.css";
import { useState } from "react";

/**
 * ProfileForm Component for editing user data.
 * @param {Object} initialUserData: The initial user data for the form
 * @param {function} onSubmit: Function to handle form submission.
 * @param {function} onCancel: Function to handle form cancelation.
 * @param {string} errorMessage: The error message to display if a problem occurs
 * @returns {JSX.Element}: The JSX element representing the ProfileForm component
 */
export default function ProfileForm({
  initialUserData,
  onSubmit,
  onCancel,
  errorMessage,
  isLoading,
}) {
  // Initialize form input state
  const [formData, setFormData] = useState(initialUserData);

  /** Handle form input changes */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  /** Handle form submission */
  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  /** Handle form cancel */
  function handleCancelClick() {
    setFormData(initialUserData);
    onCancel();
  }

  return (
    <div className="ProfileForm">
      {errorMessage && (
        <div className="ProfileForm__error-message">{errorMessage}</div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="ProfileForm__container">
          <input
            type="description"
            name="firstName"
            placeholder="First name"
            value={formData.firstName}
            onChange={handleInputChange}
            disabled={isLoading}
          />
          <input
            type="description"
            name="lastName"
            placeholder="Last name"
            value={formData.lastName}
            onChange={handleInputChange}
            disabled={isLoading}
          />
        </div>

        <div className="ProfileForm__container">
          <button
            type="submit"
            className="ProfileForm__button"
            disabled={isLoading}
          >
            Save
          </button>
          <button
            type="button"
            className="ProfileForm__button"
            onClick={handleCancelClick}
            disabled={isLoading}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
