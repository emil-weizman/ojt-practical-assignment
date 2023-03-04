import { useAppDispatch, useAppSelector } from 'store/store'
import { useEffect, useCallback, useRef } from 'react'

import { PostsActions, selectPosts } from 'store/posts/posts-slice'
import { PostsThunks } from 'store/posts/posts-thunks'

export const usePostPageRefresh = () => {
  const dispatch = useAppDispatch()

  const { allPosts, currentPage, totalPages } = useAppSelector(selectPosts)

  const currentPageRef = useRef(currentPage)
  const totalPagesRef = useRef(totalPages)

  useEffect(() => {
    currentPageRef.current = currentPage
  }, [currentPage])

  useEffect(() => {
    totalPagesRef.current = totalPages
  }, [totalPages])

  const listen = useCallback(() => {
    const _currentPage = currentPageRef.current

    if (allPosts.length === 10) {
      dispatch(PostsActions.updateCurrentPage({ currentPage: _currentPage + 1 }))
    }

    if (allPosts.length === 0 && _currentPage > 1) {
      dispatch(PostsActions.updateCurrentPage({ currentPage: _currentPage - 1 }))
    }

    const _totalPages = totalPagesRef.current

    if (allPosts.length < 9 && _currentPage < _totalPages) {
      dispatch(PostsThunks.paginationOfPosts(_currentPage))
    }
  }, [allPosts.length, dispatch])

  return { listen }
}
