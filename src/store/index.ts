import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

import counterReducer from './counter/counterSlice';
import pokemonsSlice from './pokemons/pokemonsSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    pokemons: pokemonsSlice,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(localStorageMiddleware as Middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
