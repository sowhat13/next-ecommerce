import { configureStore, combineReducers } from '@reduxjs/toolkit';


import themeSlice from './themeSlice';
import userSlice from './userSlice'
import cartSlice from './cartSlice'


export interface RootState {
  theme: typeof themeSlice.reducer;
  user: typeof userSlice.reducer;
  cart: typeof cartSlice.reducer;

  // other slices
}


//add preload state here

const reducer = combineReducers({
  theme: themeSlice.reducer,
  user: userSlice.reducer,
  cart: cartSlice.reducer,

  // other slices
});

const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV === 'development',
});


export type AppDispatch = typeof store.dispatch;

export default store;