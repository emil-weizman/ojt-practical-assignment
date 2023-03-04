import React, { useEffect, useState } from 'react'

import { useAppDispatch, useAppSelector } from 'store/store'
import { usePostPageRefresh } from 'hooks/usePostPageRefresh'
import { useScrollToTop } from 'hooks/useScrollToTop'
import { PostsActions, selectPosts } from 'store/posts/posts-slice'
import { PostsThunks } from 'store/posts/posts-thunks'
import { EffectType } from 'types/common'
import { Post } from 'components/post/Post'
import { PostViewModal } from 'components/modals/post-view-modal/PostViewModal'
import { EditPostForm } from 'components/edit-post-form/EditPostForm'
import { Modal } from 'components/modals/Modal'
import { ConfirmModal } from 'components/modals/confirm-modal/ConfirmModal'
import { Paginator } from 'components/paginator/Paginator'

import './PostList.css'

export const PostList = () => {
  const dispatch = useAppDispatch()
  const { allPosts, currentPage, totalPages, filtered, initialized } = useAppSelector(selectPosts)

  const { listen } = usePostPageRefresh()
  const { scrollToTop } = useScrollToTop()

  const [selectedPostId, setSelectedPostId] = useState<number | null>(null)
  const [effectType, setEffectType] = useState<EffectType>(null) // 'view' | 'edit' | 'delete'

  useEffect(() => {
    dispatch(PostsThunks.paginationOfPosts(currentPage))
  }, [dispatch, currentPage])

  useEffect(() => {
    if (!initialized || filtered) return

    listen()
  }, [initialized, filtered, listen])

  const onPostView = (postId: number) => {
    setEffectType('view')
    setSelectedPostId(postId)
  }

  const onPostEdit = (postId: number) => {
    setEffectType('edit')
    setSelectedPostId(postId)
  }

  const onPostDelete = (postId: number) => {
    setEffectType('delete')
    setSelectedPostId(postId)
  }

  const onPostDeleteConfirm = (confirm: boolean) => {
    if (confirm && selectedPostId) {
      dispatch(PostsThunks.deletePost(selectedPostId))
    }

    resetEffectType()
  }

  const onPageChange = (currentPage: number) => {
    dispatch(PostsActions.updateCurrentPage({ currentPage }))
    scrollToTop()
  }

  const resetEffectType = () => {
    setEffectType(null)
  }

  return (
    <>
      <div className="post_list_container">
        {allPosts.map((post, index) => (
          <Post key={index} post={post} onPostView={onPostView} onPostEdit={onPostEdit} onPostDelete={onPostDelete} />
        ))}
      </div>

      {selectedPostId && effectType === 'view' && <PostViewModal postId={selectedPostId} onClose={resetEffectType} />}

      {selectedPostId && effectType === 'edit' && (
        <Modal onClose={resetEffectType} body={<EditPostForm postId={selectedPostId} onCancel={resetEffectType} />} />
      )}

      {selectedPostId && effectType === 'delete' && (
        <Modal onClose={resetEffectType} body={<ConfirmModal onConfirm={onPostDeleteConfirm} />} />
      )}

      {totalPages > 1 && !filtered && <Paginator currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />}
    </>
  )
}
