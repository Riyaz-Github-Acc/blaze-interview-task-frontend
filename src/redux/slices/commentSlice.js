/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../../utils/baseURL";

// Initial State
const initialState = {
  comment: {},
  loading: false,
  error: null,
  isAdded: false,
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

// Create comment
export const createCommentAction = createAsyncThunk(
  "comments/create",
  async ({ id, comment }, { rejectWithValue, getState, dispatch }) => {
    try {
      const token = getCookieValue("jwt");

      const { data } = await axios.post(
        `${baseURL}/comments/${id}`,
        { comment },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      console.log(data);
      return data;
    } catch (error) {
      console.log(error?.response?.data);
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Slice
const comment = createSlice({
  name: "comments",
  initialState,
  extraReducers: (builder) => {
    // Create
    builder.addCase(createCommentAction.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(createCommentAction.fulfilled, (state, action) => {
      state.comment = action.payload;
      state.isAdded = true;
      state.loading = false;
    });

    builder.addCase(createCommentAction.rejected, (state, action) => {
      state.error = action.payload?.message;
      state.loading = false;
    });
  },
});

// Reducer
const commentReducer = comment.reducer;
export default commentReducer;
