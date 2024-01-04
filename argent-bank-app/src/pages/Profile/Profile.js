import "./Profile.css";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userService } from "../../api/userService";
import { updateUser } from "../../store/slices/userSlice";
import { Account } from "../../components";
import { userAccounts } from "../../api/data/user-accounts";

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

  /** handle form input changes */
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  /** handle form submission */
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
                  type="description"
                  name="firstName"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
                <input
                  type="description"
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
        {userAccounts.map((account) => (
          <Account
            key={account.id}
            title={account.title}
            currency={account.currency}
            amount={account.amount}
            description={account.description}
          />
        ))}
      </section>
    </main>
  );
}
