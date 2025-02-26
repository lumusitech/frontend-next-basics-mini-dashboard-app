'use client';

import { useAppSelector } from '@/store';
import { useState } from 'react';
import { IoHeartOutline } from 'react-icons/io5';
import { PokemonsGrid } from './PokemonsGrid';

export const FavoritesGrid = () => {
  const favoritesState = useAppSelector((state) =>
    Object.values(state.pokemons)
  );

  // const favoritesState = useMemo(
  //   () => () => {
  //     useAppSelector((state) => Object.values(state.pokemons));
  //   },
  //   []
  // );
  const favoritesArray = Object.values(favoritesState);

  const [favorites, setfavorites] = useState(favoritesArray);

  return (
    <>
      {favorites.length ? (
        <PokemonsGrid pokemons={favorites} />
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
