import React from 'react'

import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { selectAuth } from 'store/auth/auth-slice'
import { useAppSelector } from 'store/store'

import './NotFoundPage.css'

const unAuthenticatedDefinedUrls = ['/login']

export const NotFoundPage = () => {
  const navigate = useNavigate()
  const { userName } = useAppSelector(selectAuth)
  const location = useLocation()

  if (!userName) return <Navigate to="/login" />

  if (unAuthenticatedDefinedUrls.includes(location.pathname)) return <Navigate to="/" />

  const goToMainPage = () => {
    if (userName) {
      navigate('/')
    }
  }

  return (
    <div className="not_page_container">
      <div id="main">
        <div className="fof">
          <h1>Error 404</h1>
          <button className="my_button" onClick={goToMainPage}>
            Main Page
          </button>
        </div>
      </div>
    </div>
  )
}
