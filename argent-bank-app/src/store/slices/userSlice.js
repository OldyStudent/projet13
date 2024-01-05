import { createSlice } from "@reduxjs/toolkit";

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
  },
});

export const { setUser, updateUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
