import React from 'react'

import { DateTime } from 'luxon'
import { timeAgo } from 'utils/date-utils'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { PostsThunks } from 'store/posts/posts-thunks'
import { selectAuth } from 'store/auth/auth-slice'

import { useAppDispatch, useAppSelector } from 'store/store'
import { ButtonsEditDelete } from 'components/buttons/ButtonsEditDelete'
import { ChangePostParams, Post as PostModel } from 'store/posts/posts.types'

import avatarPng from 'assets/avatar.png'
import './Post.css'

type Props = {
  post: PostModel
  onPostView: (postId: number) => void
  onPostEdit: (postId: number) => void
  onPostDelete: (postId: number) => void
}

export const Post: React.FC<Props> = ({ post, onPostView, onPostEdit, onPostDelete }) => {
  const dispatch = useAppDispatch()

  const { userName: _useName } = useAppSelector(selectAuth)
  const userName = _useName || ''

  //////////////////////////////////////////////////////////////////////
  const timeStamp = DateTime.fromMillis(+post.date)
  const dateAgo = timeAgo(timeStamp)
  //////////////////////////////////////////////////////////////////////

  const onPostLike = () => {
    const likedPostParams: ChangePostParams = { id: post.id, title: post.title, likes: [], dislikes: [] }

    const isAlredyPostLikes = post.likes.includes(userName)
    if (isAlredyPostLikes) {
      likedPostParams.likes = post.likes.filter(item => item !== userName)
      likedPostParams.dislikes = post.dislikes
    } else {
      likedPostParams.likes = [...post.likes, userName]
      likedPostParams.dislikes = post.dislikes.filter(item => item !== userName)
    }

    dispatch(PostsThunks.editPost(likedPostParams))
  }

  const onPostDislike = () => {
    const dislikedPostParams: ChangePostParams = { id: post.id, title: post.title, likes: [], dislikes: [] }

    const isAlredyPostDislikes = post.dislikes.includes(userName)
    if (isAlredyPostDislikes) {
      dislikedPostParams.dislikes = post.dislikes.filter(item => item !== userName)
      dislikedPostParams.likes = post.likes
    } else {
      dislikedPostParams.dislikes = [...post.dislikes, userName]
      dislikedPostParams.likes = post.likes.filter(item => item !== userName)
    }

    dispatch(PostsThunks.editPost(dislikedPostParams))
  }

  return (
    <div className="post_card_container">
      <div className="card_header mb_md">
        <div className="box">
          <div>
            <img
              className="card_avatar"
              src="https://placekitten.com/250/250"
              onError={event => ((event.target as HTMLImageElement).src = avatarPng)}
              alt="avatar"
            />
          </div>

          <div className="info">
            <div className="post_username">{post.username}</div>
          </div>
        </div>
        {userName === post.username && <ButtonsEditDelete post={post} onPostEdit={onPostEdit} onPostDelete={onPostDelete} />}
      </div>

      <div className="card_title mb_md">{post.title}</div>
      <div className="ojt_time_ago">{dateAgo}</div>

      <div className="image_container mb_md">
        {!post.imageSrc ? (
          <FontAwesomeIcon icon={['fas', 'spinner']} />
        ) : (
          <img src={post.imageSrc} alt={post.imageSrc} onClick={() => onPostView(post.id)} />
        )}
      </div>

      <div className="footer">
        <div className="ojt_like_dislike_container">
          <div className="reaction">
            <FontAwesomeIcon
              size="lg"
              color="#4caf50"
              icon={['fas', 'heart-circle-plus']}
              onClick={onPostLike}
              style={{ cursor: 'pointer' }}
            />
            {post.likes.length > 0 && <div>{post.likes.length}</div>}
          </div>
          <div className="reaction">
            <FontAwesomeIcon
              size="lg"
              color="red"
              icon={['fas', 'heart-circle-minus']}
              onClick={onPostDislike}
              style={{ cursor: 'pointer' }}
            />
            {post.dislikes.length > 0 && <div>{post.dislikes.length}</div>}
          </div>
        </div>

        <div className="comments">
          <FontAwesomeIcon
            icon={['far', 'comment-dots']}
            // color="grey"
            size="lg"
            onClick={() => onPostView(post.id)}
            style={{ cursor: 'pointer' }}
          />
          <div>{post.comments.length}</div>
        </div>
      </div>
    </div>
  )
}
