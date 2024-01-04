import { userService } from "../../api/userService";
import { updateUser } from "../slices/userSlice";

/**
 * Thunk action for updating the user profile.
 *
 * @async
 * @function
 * @param {Object} formData: Data to update in the user profile.
 * @param {string} formData.firstName: User's first name.
 * @param {string} formData.lastName: User's last name.
 * @returns {Promise<string|undefined>}: A promise that resolves with an error message
 * if the update fails, or resolves with undefined if the update is successful.
 */
export const updateUserProfileThunk = (formData) => {
  return async (dispatch) => {
    try {
      await userService.updateUserProfile(
        formData.firstName,
        formData.lastName,
      );
      dispatch(updateUser(formData));
    } catch (error) {
      return error.message;
    }
  };
};
