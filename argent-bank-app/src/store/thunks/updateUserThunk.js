import { userService } from "../../api/userService";
import { createAsyncThunk } from "@reduxjs/toolkit";

/**
 * Thunk action for updating the user profile.
 *
 * @async
 * @function updateUserProfileThunk
 * @param {Object} formData: Data to update in the user profile
 * @param {string} formData.firstName: User first name
 * @param {string} formData.lastName: User last name
 * @returns {Promise<Object|RejectedValue>}: A promise that resolves with the updated user data if success, or error if rejected
 */
export const updateUserProfileThunk = createAsyncThunk(
  "user/updateUserProfile",
  async ({ firstName, lastName }, { rejectWithValue }) => {
    try {
      return await userService.updateUserProfile(firstName, lastName);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
