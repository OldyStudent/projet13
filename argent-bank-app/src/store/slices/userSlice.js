import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      return action.payload;
    },

    updateUser: (state, action) => {
      return { ...state, ...action.payload };
    },

    logoutUser: (state, action) => {
      return null;
    },
  },
});

export const { setUser, updateUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
