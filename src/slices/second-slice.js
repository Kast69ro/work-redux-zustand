import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const get = createAsyncThunk("second/get", async () => {
  try {
    const response = await axios.get(
      "https://to-dos-api.softclub.tj/api/to-dos"
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const delUser = createAsyncThunk(
  "second/delUser",
  async (id, { dispatch }) => {
    await axios.delete(`https://to-dos-api.softclub.tj/api/to-dos?id=${id}`);
    dispatch(get());
  }
);

export const addUser = createAsyncThunk(
  "second/addUser",
  async (newUser, { dispatch }) => {
    try {
      await axios.post("https://to-dos-api.softclub.tj/api/to-dos", newUser);
      dispatch(get());
    } catch (error) {
      console.log(error);
    }
  }
);

export const editUser = createAsyncThunk(
  "second/editUser",
  async (editedUser, { dispatch }) => {
    try {
      await axios.put("https://to-dos-api.softclub.tj/api/to-dos", editedUser);
      dispatch(get());
    } catch (error) {
      console.log(error);
    }
  }
);
export const delImage = createAsyncThunk(
  "second/delImage",
  async (id, { dispatch }) => {
    try {
      await axios.delete(
        `https://to-dos-api.softclub.tj/api/to-dos/images/${id}`
      );
      dispatch(get());
    } catch (error) {
      console.log(error);
    }
  }
);

export const addImages = createAsyncThunk(
  "second/addImage",
  async ({ id, img }, { dispatch }) => {
    try {
      await axios.post(
        `https://to-dos-api.softclub.tj/api/to-dos/${id}/images`,
        img
      );

      dispatch(get());
    } catch (error) {}
  }
);
export const complit = createAsyncThunk(
  "second/delUser",
  async (id, { dispatch }) => {
    await axios.put(`https://to-dos-api.softclub.tj/completed?id=${id}`);
    dispatch(get());
  }
);

export const secondSlice = createSlice({
  name: "second",
  initialState: {
    data: [],
    loading: false,
    errors: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(get.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(get.fulfilled, (state, action) => {
        (state.data = action.payload.data), (state.loading = false);
      }),
      builder.addCase(get.rejected, (state, action) => {
        (state.loading = false), (state.errors = action.payload);
      });
  },
});

export default secondSlice.reducer;
