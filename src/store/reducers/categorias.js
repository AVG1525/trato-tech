import { createStandaloneToast } from '@chakra-ui/toast';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import categoriesService from 'services/categoriesService';

const { toast } = createStandaloneToast();

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
      .addCase(fetchCategories.pending, (_, { payload }) => {
        toast({
          title: 'Carregando',
          description: 'Carregando categorias',
          status: 'loading',
          duration: 1000,
          isClosable: true
        });

        return payload;
      })
      .addCase(fetchCategories.fulfilled, (_, { payload }) => {
        toast({
          title: 'Sucesso!',
          description: 'Categorias carregadas com sucesso!',
          status: 'success',
          duration: 2000,
          isClosable: true
        });

        return payload;
      })
      .addCase(fetchCategories.rejected, (_, { payload }) => {
        toast({
          title: 'Erro',
          description: 'Erro na busca por categorias',
          status: 'error',
          duration: 2000,
          isClosable: true
        });

        return payload;
      })
  }
});

export default categoriasSlice.reducer;