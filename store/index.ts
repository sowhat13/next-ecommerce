import { configureStore, combineReducers } from '@reduxjs/toolkit';


import themeSlice from './themeSlice';
import userSlice from './userSlice'


export interface RootState {
  theme: typeof themeSlice.reducer;
  user: typeof userSlice.reducer;
  // other slices
}


//add preload state here

const reducer = combineReducers({
  theme: themeSlice.reducer,
  user: userSlice.reducer,

  // other slices
});

const store = configureStore({
  reducer
});


export type AppDispatch = typeof store.dispatch;

export default store;