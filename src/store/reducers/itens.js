import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import itensService from 'services/itensService';
import { v4 as uuid } from 'uuid';

const initialState = [];

export const fetchItens = createAsyncThunk(
  'itens/fetchItens',
  itensService.fetch
)

const itensSlice = createSlice({
  name: 'itens',
  initialState,
  reducers: {
    mudarFavorito: (state, { payload }) => {
      state.map(item => {
        if (item.id === payload) item.favorito = !item.favorito;
        return item;
      })
    },
    addItem: (state, { payload }) => {
      state.push({ ...payload, id: uuid() });
    },
    editItem: (state, { payload }) => {
      const index = state.findIndex((item) => item.id === payload.id);

      Object.assign(state[index], payload.item);
    },
    deleteItem: (state, { payload }) => {
      const index = state.findIndex((item) => item.id === payload);

      state.splice(index, 1);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItens.fulfilled, (_, { payload }) => {
        return payload;
      })
  }
});

export const {
  mudarFavorito,
  addItem,
  editItem,
  deleteItem
} = itensSlice.actions;

export default itensSlice.reducer;