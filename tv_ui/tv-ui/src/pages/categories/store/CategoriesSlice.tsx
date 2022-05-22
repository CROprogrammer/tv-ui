import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import * as categoriesApi from "../../../api/categories";

import { ErrorResponse } from "../../../models/error/errorResponse";
import { fetchWrapper } from "../../../store/utils/fetchwrapper";
import { Category } from "../models/category";

const getCategories = createAsyncThunk("categories", async (categoryName: string | null) => {
  if (categoryName !== null) {
    return await fetchWrapper<Category[]>(categoriesApi.getCategoriesByName(categoryName));
  } else {
    return await fetchWrapper<Category[]>(categoriesApi.getAllCategories());
  }
});

type CategoriesState = {
  categories: Category[];
  status: "idle" | "success" | "waiting" | "error";
  error?: ErrorResponse;
};

export const categoriesInitialState: CategoriesState = {
  categories: [] as Category[],
  status: "idle",
  error: { statusCode: 0, message: "" },
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState: categoriesInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategories.pending, (state) => {
      state.status = "waiting";
    });

    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.status = "success";
      state.categories = action.payload;
    });

    builder.addCase(getCategories.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload as ErrorResponse;
    });
  },
});

export const categories = categoriesSlice.reducer;
export const categoriesAction = {
  getCategories,
  ...categoriesSlice.actions,
};
