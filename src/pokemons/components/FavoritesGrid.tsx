'use client';

import { useAppSelector } from '@/store';
import { createSelector } from '@reduxjs/toolkit';
import { IoHeartOutline } from 'react-icons/io5';
import { SimplePokemon } from '../interfaces/simple-pokemon';
import { PokemonsGrid } from './PokemonsGrid';

// This step is very important for memoization and avoid warning for re render unnecessary
const pokemonsSelector = (state: any) => state.pokemons.favorites;

const buildFavoritesPokemons = createSelector(
  [pokemonsSelector],
  (pokemons: Record<string, SimplePokemon>) => Object.values(pokemons)
);

export const FavoritesGrid = () => {
  const favoritePokemons = useAppSelector(buildFavoritesPokemons);

  return (
    <>
      {favoritePokemons.length ? (
        <PokemonsGrid pokemons={favoritePokemons} />
      ) : (
        <NoFavorites />
      )}
    </>
  );
};

export const NoFavorites = () => {
  return (
    <div className="flex flex-col h-[50vh] items-center justify-center">
      <IoHeartOutline size={200} className="text-red-500" />
      <span className="text-2xl animate-pulse">No favorites</span>
    </div>
  );
};
