import React from 'react'

import { Navigate } from 'react-router-dom'
import { selectAuth } from 'store/auth/auth-slice'
import { useAppSelector } from 'store/store'

type Props = {
  component: React.ReactNode
}
export const PrivateRoute: React.FC<Props> = ({ component }) => {
  const auth = useAppSelector(selectAuth)

  if (auth.isLoggedIn) return <>{component}</>

  return <Navigate to="/login" />
}
