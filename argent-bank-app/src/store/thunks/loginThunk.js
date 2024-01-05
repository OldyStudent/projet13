import { userService } from "../../api/userService";
import { setUser } from "../slices/userSlice";

/**
 * Thunk action for handling user login.
 *
 * @async
 * @function
 * @param {string} username - Username for the login.
 * @param {string} password - Password for the login.
 * @returns {Promise<string|undefined>} Returns a promise that resolves to:
 *   - `undefined` on a successful login.
 *   - An error message string if the login fails.
 */
export const loginThunk = (username, password) => {
  return async (dispatch) => {
    try {
      const loginData = await userService.login(username, password);
      localStorage.setItem("token", loginData.token);
      const userData = await userService.getUserProfile();
      dispatch(setUser(userData));
    } catch (error) {
      return error.message;
    }
  };
};
