import "./Profile.css";
import { useEffect, useState } from "react";
import { Account, ProfileForm } from "../../components";
import { userAccounts } from "../../api/data/user-accounts";
import { useSelector, useDispatch } from "react-redux";
import { updateUserProfileThunk } from "../../store/thunks/updateUserThunk";
import { setError } from "../../store/slices/userSlice";

/**
 * Profile Page Component
 * Displays user profile information and allows editing of the user's name.
 */
export default function Profile() {
  const dispatch = useDispatch();
  const { firstName, lastName, error, isLoading } = useSelector(
    (state) => state.user,
  );

  const [editMode, setEditMode] = useState(false);
  const initialUserName = { firstName, lastName };

  /** Handles the submission of the edit name form
   * @param {Object} formData: Data to update in the user profile.
   * @param {string} formData.firstName: User first name.
   * @param {string} formData.lastName: User last name.
   */
  const handleEditNameSubmit = async (formData) => {
    await dispatch(updateUserProfileThunk(formData));
  };

  /** Toggles the edit mode for the profile form */
  const toggleEditMode = () => {
    setEditMode(!editMode);
    if (error) {
      dispatch(setError(null));
    }
  };

  useEffect(() => {
    if (!isLoading && !error) {
      setEditMode(false);
    }
  }, [isLoading, error]);

  return (
    <main className="Profile">
      <section>
        <h2>
          Welcome back <br />
          {firstName} {lastName}!
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
              isLoading={isLoading}
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
