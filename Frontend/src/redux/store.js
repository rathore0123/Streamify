import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./userSlice.js"
import movieReducer from "./movieSlice.js"

export const store = configureStore({
  reducer: {
    user: userReducer,
    movie: movieReducer,
  },
});