import React from 'react'

import { useAppDispatch, useAppSelector } from 'store/store'
import { useForm } from 'react-hook-form'

import { selectPosts } from 'store/posts/posts-slice'
import { PostsThunks } from 'store/posts/posts-thunks'

import './FilterPosts.css'

type FilterKeyword = {
  text: string
}

export const FilterPosts = () => {
  const dispatch = useAppDispatch()
  const { filtered } = useAppSelector(selectPosts)

  const { register, handleSubmit, reset } = useForm<FilterKeyword>()

  const onFilterForm = (data: FilterKeyword) => {
    const keyword = data.text

    if (keyword.length !== 0) {
      dispatch(PostsThunks.filterPosts(keyword))
      return
    }

    if (!filtered) return
    dispatch(PostsThunks.paginationOfPosts(1))
  }

  const onClearFilter = () => {
    dispatch(PostsThunks.paginationOfPosts(1))
    reset()
  }

  return (
    <div className="filter_input_box">
      <form onSubmit={handleSubmit(onFilterForm)}>
        <input className="ojt_input" {...register('text')} type="text" placeholder="Filter your posts..." />
        <input type="submit" hidden />
      </form>
      <button className="btn btn-link" onClick={onClearFilter}>
        clear
      </button>
    </div>
  )
}
