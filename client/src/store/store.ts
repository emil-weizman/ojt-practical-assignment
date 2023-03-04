import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch as useReduxDispatch, useSelector as useReduxSelector } from 'react-redux'
import { AuthReducer } from './auth/auth-slice'
import { PostsReducer } from './posts/posts-slice'

const rootReducer = combineReducers({
  posts: PostsReducer,
  auth: AuthReducer
})

export const store = configureStore({
  reducer: rootReducer
})

type AppDispatch = typeof store.dispatch

export type RootState = ReturnType<typeof rootReducer>
export const useAppDispatch = () => useReduxDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useReduxSelector
