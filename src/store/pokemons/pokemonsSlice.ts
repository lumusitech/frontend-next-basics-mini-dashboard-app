import { SimplePokemon } from '@/pokemons';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PokemonsState {
  favorites: { [key: string]: SimplePokemon };
}

// const getInitialState = (): PokemonsState => {
//   const favorites = JSON.parse(
//     localStorage.getItem('favorite-pokemons') ?? '{}'
//   );
//   return favorites;
// };

const initialState: PokemonsState = {
  favorites: {},
};

const pokemonsSlice = createSlice({
  name: 'pokemons',
  initialState,
  reducers: {
    setFavoritePokemons(
      state,
      action: PayloadAction<{ [key: string]: SimplePokemon }>
    ) {
      state.favorites = action.payload;
    },
    toggleFavorite(state, action: PayloadAction<SimplePokemon>) {
      const pokemon = action.payload;
      const { id } = action.payload;

      if (!!state.favorites[id]) delete state.favorites[id];
      else state.favorites[id] = pokemon;

      //! Warning: This is a bad practice. actions must be pure functions
      localStorage.setItem(
        'favorite-pokemons',
        JSON.stringify(state.favorites)
      );
    },
  },
});

export const { toggleFavorite, setFavoritePokemons } = pokemonsSlice.actions;

export default pokemonsSlice.reducer;
