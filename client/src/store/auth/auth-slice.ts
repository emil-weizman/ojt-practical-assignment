import { createSlice } from '@reduxjs/toolkit'
import { RootState } from 'store/store'

const userNameFromLS = window.localStorage.getItem('auth.userName')

interface AuthState {
  userName: string | null
  isLoggedIn: boolean
}

const initialState: AuthState = {
  userName: userNameFromLS,
  isLoggedIn: userNameFromLS !== undefined && userNameFromLS !== null && userNameFromLS !== ''
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      const userName = action.payload.data

      state.userName = userName

      window.localStorage.setItem('auth.userName', userName)

      state.isLoggedIn = true
    },
    logout: state => {
      window.localStorage.removeItem('auth.userName')

      state.userName = ''

      state.isLoggedIn = false
    }
  }
})

export const AuthActions = authSlice.actions
export const AuthReducer = authSlice.reducer

export const selectAuth = (state: RootState) => state.auth
