import React from 'react'

import { PostsThunks } from 'store/posts/posts-thunks'
import { selectAuth } from 'store/auth/auth-slice'
import { PostForm, PostFormValues } from 'components/post-form/PostForm'
import { useAppDispatch, useAppSelector } from 'store/store'

type Props = {
  onCancel: () => void
}

export const CreatePostForm: React.FC<Props> = ({ onCancel }) => {
  const dispatch = useAppDispatch()
  const { userName } = useAppSelector(selectAuth)

  const onCreatePost = async (data: PostFormValues) => {
    const pictureFormData = new FormData()
    pictureFormData.append('picture', data.postPicture[0])
    const newPost = await dispatch(
      PostsThunks.createPost({
        username: userName || '',
        title: data.title
      })
    ).unwrap()

    if (data.postPicture.length > 0) {
      const pictureFormData = new FormData()
      pictureFormData.append('picture', data.postPicture[0])
      dispatch(
        PostsThunks.uploadPicture({
          postId: newPost.id,
          pictureFormData
        })
      )
    }

    onCancel()
  }

  return <PostForm title="Create a post" onClose={onCancel} onSubmit={onCreatePost} />
}
