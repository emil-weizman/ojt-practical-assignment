import React, { useEffect, useState } from 'react'

import { useForm } from 'react-hook-form'
import { DateTime } from 'luxon'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { timeAgo } from 'utils/date-utils'
import { Modal } from '../Modal'
import { EditCommentForm } from 'components/edit-comment-form/EditCommentForm'
import { ConfirmModal } from 'components/modals/confirm-modal/ConfirmModal'

import { PostsThunks } from 'store/posts/posts-thunks'
import { selectPost } from 'store/posts/posts-slice'
import { selectAuth } from 'store/auth/auth-slice'

import avatarPng from '../../../assets/avatar.png'

import './PostViewModal.css'
import { useAppDispatch, useAppSelector } from 'store/store'
import { EffectType } from 'types/common'
import { ChangeCommentParams, Comment } from 'store/posts/posts.types'
import { useOnEscape } from 'hooks/useOnEscape'

type Props = {
  postId: number
  onClose: () => void
}

type CommentFormValues = {
  username: string
  text: string
  postId: number
  id?: number
}

export const PostViewModal: React.FC<Props> = ({ postId, onClose }) => {
  const dispatch = useAppDispatch()
  const { escapeClicked } = useOnEscape()
  const post = useAppSelector(selectPost(postId))
  const { userName: _useName } = useAppSelector(selectAuth)
  const { register, handleSubmit, reset } = useForm<CommentFormValues>()
  const [effectType, setEffectType] = useState<EffectType>(null) // 'view' | 'edit' | 'delete'
  const [selectedCommentId, setSelectedCommentId] = useState<number | null>(null)

  useEffect(() => {
    if (!escapeClicked || effectType) return

    onClose()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [escapeClicked, onClose])

  if (!post) return <span>No Post with such id {postId}</span>

  const userName = _useName || ''

  const onModalContainerClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
  }

  const onSubmit = (data: CommentFormValues) => {
    if (data.text.length === 0) return

    dispatch(
      PostsThunks.addComment({
        username: userName,
        postId: post.id,
        text: data.text
      })
    )
    reset()
  }

  //////////////////////////////////////////////////////////////////////
  const timeStamp = DateTime.fromMillis(+post.date)
  const dateAgo = timeAgo(timeStamp)
  //////////////////////////////////////////////////////////////////////

  const deleteComment = (commentId: number) => {
    setEffectType('delete')
    setSelectedCommentId(commentId)
  }

  const editComment = (comment: Comment) => {
    setEffectType('edit')
    setSelectedCommentId(comment.id)
    dispatch(PostsThunks.editComment(comment))
  }

  const onCommentLike = (comment: Comment) => {
    const likedCommentParams: ChangeCommentParams = { id: comment.id, text: comment.text, likes: [], dislikes: [] }

    const isAlreadyCommentLiked = comment.likes.includes(userName)
    if (isAlreadyCommentLiked) {
      likedCommentParams.likes = comment.likes.filter(item => item !== userName)
      likedCommentParams.dislikes = comment.dislikes
    } else {
      likedCommentParams.likes = [...comment.likes, userName]
      likedCommentParams.dislikes = comment.dislikes.filter(item => item !== userName)
    }

    dispatch(PostsThunks.editComment(likedCommentParams))
  }

  const onCommentDislike = (comment: Comment) => {
    const dislikedCommentParams: ChangeCommentParams = { id: comment.id, text: comment.text, likes: [], dislikes: [] }

    const isAlreadyCommentDisliked = comment.dislikes.includes(userName)

    if (isAlreadyCommentDisliked) {
      dislikedCommentParams.dislikes = comment.dislikes.filter(item => item !== userName)
      dislikedCommentParams.likes = comment.likes
    } else {
      dislikedCommentParams.dislikes = [...comment.dislikes, userName]
      dislikedCommentParams.likes = comment.likes.filter(item => item !== userName)
    }

    dispatch(PostsThunks.editComment(dislikedCommentParams))
  }

  const onCommentDeleteConfrirm = (confirm: boolean) => {
    if (confirm && selectedCommentId) {
      dispatch(PostsThunks.deleteComment(selectedCommentId))
    }

    resetEffectType()
  }

  const resetEffectType = () => {
    setEffectType(null)
  }

  return (
    <div className="modal_overlay" onClick={onClose}>
      <div className="modal_container modal_container_edit_post" onClick={onModalContainerClick}>
        <div className="modal_nav mb_md">
          <button onClick={onClose}>
            <FontAwesomeIcon icon={['fas', 'xmark']} />
          </button>
        </div>
        <div className="modal_body">
          <div className="left_side image_container">
            <img src={post.imageSrc} alt={post.imageSrc} />
          </div>
          <div className="right_side">
            <div className="mb_md flex al_it_center">
              <img
                className="card_avatar"
                src="https://placekitten.com/250/250"
                onError={event => ((event.target as HTMLImageElement).src = avatarPng)}
                alt="avatar"
              />
              {post.username}
            </div>
            <div className="card_title"> {post.title} </div>
            <div className="ojt_time_ago">{dateAgo}</div>
            <hr />
            <div className="comments_container">
              {post.comments?.map(comment => (
                <div key={comment.id} className="mb_md">
                  <div className="comments_timestamp">{DateTime.fromMillis(+comment.date).toISODate()}</div>

                  <div>
                    <b>{comment.username}: </b>
                    <span className="text_wrap">{comment.text}</span>
                  </div>

                  <div className="icons_row">
                    <div className="ojt_like_dislike_container">
                      <div className="reaction">
                        <FontAwesomeIcon
                          size="sm"
                          color="#4caf50"
                          icon={['fas', 'heart-circle-plus']}
                          onClick={() => onCommentLike(comment)}
                        />
                        {comment.likes.length > 0 && <div>{comment.likes.length}</div>}
                      </div>

                      <div className="reaction">
                        <FontAwesomeIcon
                          size="sm"
                          color="red"
                          icon={['fas', 'heart-circle-minus']}
                          onClick={() => onCommentDislike(comment)}
                        />
                        {comment.dislikes.length > 0 && <div>{comment.dislikes.length}</div>}
                      </div>
                    </div>

                    {userName === comment.username && (
                      <div className="ojt_edit_delete_icons">
                        <FontAwesomeIcon className="ojt_icon" size="sm" icon={['fas', 'pen']} onClick={() => editComment(comment)} />
                        <FontAwesomeIcon className="ojt_icon" size="sm" icon={['fas', 'trash']} onClick={() => deleteComment(comment.id)} />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <hr />
            <form onSubmit={handleSubmit(onSubmit)}>
              <input className="ojt_input ojt_grey flex1" {...register('text')} type="text" placeholder="Add a comment..." />
              <button type="submit" className="comment_button">
                <FontAwesomeIcon icon={['fas', 'paper-plane']} />
              </button>
            </form>
          </div>
        </div>
      </div>

      {effectType === 'edit' && selectedCommentId !== null && (
        <Modal body={<EditCommentForm commentId={selectedCommentId} onCancel={resetEffectType} />} onClose={resetEffectType} />
      )}

      {effectType === 'delete' && <Modal onClose={resetEffectType} body={<ConfirmModal onConfirm={onCommentDeleteConfrirm} />} />}
    </div>
  )
}
