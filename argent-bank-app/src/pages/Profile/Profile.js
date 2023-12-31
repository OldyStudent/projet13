import "./Profile.css";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userService } from "../../api/userService";
import { updateUser } from "../../store/slices/userSlice";

export default function Profile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const initialUserName = {
    firstName: user.firstName,
    lastName: user.lastName,
  };

  // Initialize form input state
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(initialUserName);

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userService.updateUserProfile(
        formData.firstName,
        formData.lastName,
      );

      dispatch(updateUser(formData));
      setEditMode(false);
    } catch (error) {
      console.log("Erreur lors de l'envoi des données", error);
    }
  };

  function handleCancelClick() {
    setFormData(initialUserName);
    setEditMode(false);
  }

  return (
    <main className="Profile">
      <section>
        <h2>
          Welcome back <br />
          {user.firstName} {user.lastName} !
        </h2>

        {!editMode ? (
          <button
            className="Profile__edit-name-btn"
            onClick={() => setEditMode(true)}
          >
            Edit Name
          </button>
        ) : (
          <div>
            <form onSubmit={handleSubmit}>
              <div className="container">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="container">
                <button type="submit" className="Profile__form-button">
                  Save
                </button>
                <button
                  type="button"
                  className="Profile__form-button"
                  onClick={handleCancelClick}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </section>

      <section className="Profile__transactions">
        <article className="transaction-container">
          <div>
            <h3 className="account-title">Argent Bank Checking (x8349)</h3>
            <p className="account-amount">$2,082.79</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div>
            <button className="transaction-button">View transactions</button>
          </div>
        </article>

        <article className="transaction-container">
          <div>
            <h3 className="account-title">Argent Bank Savings (x6712)</h3>
            <p className="account-amount">$10,928.42</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div>
            <button className="transaction-button">View transactions</button>
          </div>
        </article>

        <article className="transaction-container">
          <div>
            <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
            <p className="account-amount">$184.30</p>
            <p className="account-amount-description">Current Balance</p>
          </div>
          <div>
            <button className="transaction-button">View transactions</button>
          </div>
        </article>
      </section>
    </main>
  );
}
