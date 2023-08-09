/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../../utils/baseURL";

// Initial State
const initialState = {
  posts: [],
  post: {},
  loading: false,
  error: null,
  isAdded: false,
  isUpdated: false,
  isDeleted: false,
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

// Create post
export const createPostAction = createAsyncThunk(
  "posts/create",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { title, desc, file } = payload;

      const formData = new FormData();
      formData.append("title", title);
      formData.append("desc", desc);
      formData.append("file", file);

      const token = getCookieValue("jwt");

      const { data } = await axios.post(`${baseURL}/posts`, formData, {
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

// Update post
export const updatePostAction = createAsyncThunk(
  "posts/update",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { id, title, desc, file } = payload;

      const formData = new FormData();
      formData.append("title", title);
      formData.append("desc", desc);

      if (file) {
        formData.append("file", file);
      }

      const token = getCookieValue("jwt");

      const { data } = await axios.put(`${baseURL}/posts/${id}`, formData, {
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

// Delete post
export const deletePostAction = createAsyncThunk(
  "posts/delete",
  async (id, { rejectWithValue, getState, dispatch }) => {
    try {
      const token = getCookieValue("jwt");

      const { data } = await axios.delete(`${baseURL}/posts/${id}`, {
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

// Get post
export const fetchPostAction = createAsyncThunk(
  "posts/details",
  async (postId, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(`${baseURL}/posts/${postId}`);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Get all the posts
export const fetchPostsAction = createAsyncThunk(
  "posts/fetch-all",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      // Make http Request
      const { data } = await axios.get(`${baseURL}/posts`);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Slice
const postSlice = createSlice({
  name: "posts",
  initialState,
  extraReducers: (builder) => {
    // Create
    builder.addCase(createPostAction.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(createPostAction.fulfilled, (state, action) => {
      state.post = action.payload;
      state.loading = false;
    });

    builder.addCase(createPostAction.rejected, (state, action) => {
      state.error = action.payload?.message;
      state.loading = false;
    });

    // Update
    builder.addCase(updatePostAction.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(updatePostAction.fulfilled, (state, action) => {
      state.post = action.payload;
      state.isUpdated = true;
      state.loading = false;
    });

    builder.addCase(updatePostAction.rejected, (state, action) => {
      state.error = action.payload?.message;
      state.loading = false;
    });

    // Delete
    builder.addCase(deletePostAction.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(deletePostAction.fulfilled, (state, action) => {
      state.isDeleted = true;
      state.loading = false;
    });

    builder.addCase(deletePostAction.rejected, (state, action) => {
      state.error = action.payload?.message;
      state.loading = false;
    });

    // Fetch
    builder.addCase(fetchPostAction.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(fetchPostAction.fulfilled, (state, action) => {
      state.post = action.payload;
      state.loading = false;
    });

    builder.addCase(fetchPostAction.rejected, (state, action) => {
      state.error = action.payload?.message;
      state.loading = false;
    });

    // Fetch All
    builder.addCase(fetchPostsAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPostsAction.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchPostsAction.rejected, (state, action) => {
      state.error = action.payload?.message;
      state.loading = false;
    });
  },
});

// Reducer
const postReducer = postSlice.reducer;
export default postReducer;
