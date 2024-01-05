import { createSlice } from "@reduxjs/toolkit";
import { updateUserProfileThunk } from "../thunks/updateUserThunk";

/**
 * Initial state for the user slice
 */
const initialState = {
  id: null,
  email: "",
  firstName: "",
  lastName: "",
  createdAt: null,
  updatedAt: null,
  isLoading: false,
  error: null,
};

/**
 * Slice for handling user authentication and data state update
 */
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      return { ...state, ...action.payload };
    },

    updateUser: (state, action) => {
      return { ...state, ...action.payload };
    },

    logoutUser: () => initialState,

    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUserProfileThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserProfileThunk.fulfilled, (state, action) => {
        return { ...state, ...action.payload, isLoading: false, error: null };
      })
      .addCase(updateUserProfileThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setUser, updateUser, logoutUser, setError } = userSlice.actions;
export default userSlice.reducer;
