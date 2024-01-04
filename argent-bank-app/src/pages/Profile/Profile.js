import "./Profile.css";
import { useState } from "react";
import { Account, ProfileForm } from "../../components";
import { userAccounts } from "../../api/data/user-accounts";
import { useSelector, useDispatch } from "react-redux";
import { updateUserProfileThunk } from "../../store/thunks/updateUserThunk";

/**
 * Profile Page Component
 * Displays user profile information and allows editing of the user's name.
 */
export default function Profile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);

  const initialUserName = {
    firstName: user.firstName,
    lastName: user.lastName,
  };

  /** Handles the submission of the edit name form
   * @param {Object} formData: Data from the profile edit form.
   */
  const handleEditNameSubmit = async (formData) => {
    const errorMessage = await dispatch(updateUserProfileThunk(formData));
    errorMessage ? setError(errorMessage) : toggleEditMode();
  };

  /** Toggles the edit mode for the profile form */
  const toggleEditMode = () => {
    setEditMode(!editMode);
    setError("");
  };

  return (
    <main className="Profile">
      <section>
        <h2>
          Welcome back <br />
          {user.firstName} {user.lastName} !
        </h2>

        {!editMode ? (
          <button className="Profile__edit-name-btn" onClick={toggleEditMode}>
            Edit Name
          </button>
        ) : (
          <div>
            <ProfileForm
              onSubmit={handleEditNameSubmit}
              onCancel={toggleEditMode}
              initialUserData={initialUserName}
              errorMessage={error}
            />
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
