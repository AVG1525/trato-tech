import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import categoriesService from 'services/categoriesService';

const initialState = [];

export const fetchCategories = createAsyncThunk(
  'categorias/fetchCategories',
  categoriesService.fetch
);

const categoriasSlice = createSlice({
  name: 'categorias',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.fulfilled, (_, { payload }) => {
        return payload;
      })
  }
});

export default categoriasSlice.reducer;