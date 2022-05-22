import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import * as categoriesApi from "../../../api/categories";

import { ErrorResponse } from "../../../models/error/errorResponse";
import { fetchWrapper } from "../../../store/utils/fetchwrapper";
import { Category } from "../models/category";

const getCategoryById = createAsyncThunk(
  "categories/byId",
  async (categoryId: string) => {
    return await fetchWrapper<Category>(
      categoriesApi.getCategoryById(categoryId)
    );
  }
);

type CategoryState = {
  category: Category;
  status: "idle" | "success" | "waiting" | "error";
  error?: ErrorResponse;
};

export const categoryInitialState: CategoryState = {
  category: {} as Category,
  status: "idle",
  error: { statusCode: 0, message: "" },
};

export const categorySlice = createSlice({
  name: "categories/byId",
  initialState: categoryInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategoryById.pending, (state) => {
      state.status = "waiting";
    });

    builder.addCase(getCategoryById.fulfilled, (state, action) => {
      state.status = "success";
      state.category = action.payload;
    });

    builder.addCase(getCategoryById.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload as ErrorResponse;
    });
  },
});

export const category = categorySlice.reducer;
export const categoriesAction = {
  getCategoryById,
  ...categorySlice.actions,
};
