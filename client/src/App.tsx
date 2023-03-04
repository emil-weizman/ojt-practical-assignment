import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'

import { LoginPage } from 'components/login-page/LoginPage'
import { MainPage } from 'components/main-page/MainPage'
import { NotFoundPage } from 'components/not-fount-page/NotFoundPage'

import { useAppSelector } from 'store/store'
import { selectAuth } from 'store/auth/auth-slice'

import './App.css'

export const App: React.FC = () => {
  const auth = useAppSelector(selectAuth)

  const router = auth.isLoggedIn ? getAuthenticatedRouter() : getUnAuthenticatedRoutes()

  return <RouterProvider router={router} />
}

const getAuthenticatedRouter = () => {
  return createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route index path="" element={<MainPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </>
    )
  )
}

const getUnAuthenticatedRoutes = () => {
  return createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route index path="login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </>
    )
  )
}
