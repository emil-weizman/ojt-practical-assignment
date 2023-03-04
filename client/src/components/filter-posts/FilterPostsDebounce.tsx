import React, { useState, useMemo, useCallback } from 'react'
import { debounce } from 'lodash'

import { useAppDispatch } from 'store/store'
import { PostsThunks } from 'store/posts/posts-thunks'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './FilterPosts.css'

export const FilterPostsDebounce = () => {
  const dispatch = useAppDispatch()

  const [inputValue, setInputValue] = useState('')

  const filterPosts = useCallback(
    (keyword: string) => {
      if (keyword.length !== 0) {
        dispatch(PostsThunks.filterPosts(keyword))
        return
      }

      dispatch(PostsThunks.paginationOfPosts(1))
    },
    [dispatch]
  )

  const updateFilterPostsDeffered = useMemo(() => {
    return debounce(filterPosts, 300)
  }, [filterPosts])

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setInputValue(value)
    updateFilterPostsDeffered(value)
  }

  const onClearFilter = () => {
    const value = ''
    dispatch(PostsThunks.paginationOfPosts(1))
    setInputValue(value)
    updateFilterPostsDeffered(value)
  }

  return (
    <div className="filter_input_box">
      <input className="filter_input_with_button" type="text" placeholder="Filter your posts..." value={inputValue} onChange={onChange} />
      <FontAwesomeIcon icon={['fas', 'xmark']} size="lg" className="filter_button_clear" color="grey" onClick={onClearFilter} />
    </div>
  )
}
