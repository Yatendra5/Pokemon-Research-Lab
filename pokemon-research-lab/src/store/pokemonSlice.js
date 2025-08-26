
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pokemons: [],
};

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setPokemons: (state, action) => {
      state.pokemons = action.payload;
    },
    addColumn: (state, action) => {
      const { columnName, defaultValue } = action.payload;
      state.pokemons = state.pokemons.map(pokemon => ({
        ...pokemon,
        [columnName]: defaultValue,
      }));
    },
  },
});

export const { setPokemons, addColumn } = pokemonSlice.actions;
export default pokemonSlice.reducer;
