import { configureStore, combineReducers } from '@reduxjs/toolkit';


import themeSlice from './themeSlice';



export interface RootState {
  theme: typeof themeSlice.reducer;
  // other slices
}


//add preload state here

const reducer = combineReducers({
  theme: themeSlice.reducer,
  // other slices
});

const store = configureStore({
  reducer
});


export type AppDispatch = typeof store.dispatch;

export default store;