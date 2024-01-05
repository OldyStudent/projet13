import { createSlice } from "@reduxjs/toolkit";
import { loginThunk } from "../thunks/loginThunk";
import { updateUserProfileThunk } from "../thunks/updateUserThunk";

/** Initial state for the user slice */
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

/** Slice for handling user authentication and data state update */
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      return { ...state, ...action.payload };
    },

    logoutUser: () => initialState,

    setError: (state, action) => {
      state.error = action.payload;
    },
  },

  extraReducers: (builder) => {
    handleAsyncThunk(builder, loginThunk);
    handleAsyncThunk(builder, updateUserProfileThunk);
  },
});

export const { setUser, updateUser, logoutUser, setError } = userSlice.actions;
export default userSlice.reducer;

// Private functions
const handleAsyncThunk = (builder, thunk) => {
  builder
    .addCase(thunk.pending, (state) => {
      updateLoadingAndErrorState(state, null, true);
    })
    .addCase(thunk.fulfilled, (state, action) => {
      return { ...state, ...action.payload, isLoading: false, error: null };
    })
    .addCase(thunk.rejected, (state, action) => {
      updateLoadingAndErrorState(state, action.payload, false);
    });
};

const updateLoadingAndErrorState = (state, error, isLoading) => {
  state.isLoading = isLoading;
  state.error = error;
};
