import React from 'react'

import { FunctionalBar } from 'components/function-bar/FunctionalBar'
import { PostList } from 'components/post-list/PostList'
import { Header } from 'components/header/Header'

import './MainPage.css'

export const MainPage = () => {
  return (
    <>
      <Header />
      <FunctionalBar />
      <PostList />
    </>
  )
}
