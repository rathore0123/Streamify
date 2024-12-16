import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  isLoading:false,
  isLogin:false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    clearUser: (state, action) => {
      state.user = action.payload
    },
    setisLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setIsLogin: (state, action) => {
      state.isLogin = action.payload
    }
  },
})

export const { setUser, clearUser, setisLoading, setIsLogin } = userSlice.actions;

export default userSlice.reducer;