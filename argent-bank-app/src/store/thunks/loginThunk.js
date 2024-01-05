import { userService } from "../../api/userService";
import { createAsyncThunk } from "@reduxjs/toolkit";

/**
 * Thunk action for handling user login.
 *
 * @async
 * @function loginThunk
 * @param {Object} arg - The arguments object.
 * @param {string} arg.username - Username for the login.
 * @param {string} arg.password - Password for the login.
 * @returns {Promise<Object|RejectedValue>} A promise that resolves with the user profile data if success, or error if rejected
 */
export const loginThunk = createAsyncThunk(
  "user/login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const loginData = await userService.login(username, password);
      localStorage.setItem("token", loginData.token);
      return await userService.getUserProfile();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const USER_LOGIN_FULFILLED = "user/login/fulfilled";
