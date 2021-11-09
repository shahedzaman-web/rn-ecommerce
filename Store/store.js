import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./authSlice"
import cartSlice from './cartSlice'
import userSlice from './userSlice'


export const store = configureStore({
  reducer: {
      auth: authReducer,
      cart: cartSlice,
      user: userSlice
  },
})
