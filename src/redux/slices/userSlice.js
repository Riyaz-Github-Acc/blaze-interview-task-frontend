/* eslint-disable no-unused-vars */
import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { baseURL } from "../../utils/baseURL";

// Initial State
const initialState = {
  loading: false,
  error: null,
  users: [],
  user: null,
  profile: {},

  userAuth: {
    userInfo: localStorage.getItem("userToken")
      ? JSON.parse(localStorage.getItem("userToken"))
      : null,
    loading: false,
    error: null,
  },
};

const getCookieValue = (name) => {
  const cookie = document.cookie;
  const cookieArray = cookie.split("; ");

  for (let i = 0; i < cookieArray.length; i++) {
    const cookiePair = cookieArray[i].split("=");
    if (cookiePair[0] === name) {
      return cookiePair[1];
    }
  }

  return null;
};

// Register
export const registerUserAction = createAsyncThunk(
  "users/register",
  async (
    { username, email, password },
    { rejectWithValue, getState, dispatch }
  ) => {
    try {
      const { data } = await axios.post(`${baseURL}/users/register`, {
        username,
        email,
        password,
      });
      return data;
    } catch (err) {
      return rejectWithValue(err?.response?.data);
    }
  }
);

// Login
export const loginUserAction = createAsyncThunk(
  "users/login",
  async ({ email, password }, { rejectWithValue, getState, dispatch }) => {
    try {
      // HTTP Request
      const { data } = await axios.post(
        `${baseURL}/users/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      // Save the user in local storage
      localStorage.setItem("userToken", JSON.stringify(data));

      return data;
    } catch (err) {
      return rejectWithValue(err?.response?.data);
    }
  }
);

// Logout
export const logoutUserAction = createAsyncThunk(
  "users/logout",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.post(
        `${baseURL}/users/logout`,
        {},
        {
          withCredentials: true,
        }
      );

      localStorage.removeItem("userToken");
      return data;
    } catch (err) {
      return rejectWithValue(err?.response?.data);
    }
  }
);

// Profile
export const fetchProfileAction = createAsyncThunk(
  "users/profile",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const token = getCookieValue("jwt");
      const { data } = await axios.get(`${baseURL}/users/profile`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Slice
const userSlice = createSlice({
  name: "users",
  initialState,
  extraReducers: (builder) => {
    // Register
    builder.addCase(registerUserAction.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(registerUserAction.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });

    builder.addCase(registerUserAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    // Login
    builder.addCase(loginUserAction.pending, (state, action) => {
      state.userAuth.loading = true;
    });

    builder.addCase(loginUserAction.fulfilled, (state, action) => {
      state.userAuth.userInfo = action.payload;
      state.userAuth.loading = false;
    });

    builder.addCase(loginUserAction.rejected, (state, action) => {
      state.userAuth.error = action.payload;
      state.userAuth.loading = false;
    });

    // Logout
    builder.addCase(logoutUserAction.pending, (state, action) => {
      state.userAuth.loading = true;
    });

    builder.addCase(logoutUserAction.fulfilled, (state, action) => {
      state.userAuth.userInfo = action.payload;
      state.userAuth.loading = false;
    });

    builder.addCase(logoutUserAction.rejected, (state, action) => {
      state.userAuth.error = action.payload;
      state.userAuth.loading = false;
    });

    // Profile
    builder.addCase(fetchProfileAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchProfileAction.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchProfileAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
  },
});

// Reducer
const userReducer = userSlice.reducer;
export default userReducer;
