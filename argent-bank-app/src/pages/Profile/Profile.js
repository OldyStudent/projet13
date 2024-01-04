import "./Profile.css";

import { useState } from "react";
import { Account, ProfileForm } from "../../components";
import { updateUser } from "../../store/slices/userSlice";
import { userService } from "../../api/userService";
import { userAccounts } from "../../api/data/user-accounts";
import { useSelector, useDispatch } from "react-redux";

export default function Profile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [editMode, setEditMode] = useState(false);

  const initialUserName = {
    firstName: user.firstName,
    lastName: user.lastName,
  };

  /** Handle form submission */
  const handleSubmit = async (formData) => {
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
            <ProfileForm
              onSubmit={handleSubmit}
              onCancel={() => setEditMode(false)}
              initialUserData={initialUserName}
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
