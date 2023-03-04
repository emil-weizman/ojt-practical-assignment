import React from 'react'

import { PostForm, PostFormValues } from 'components/post-form/PostForm'
import { selectPost } from 'store/posts/posts-slice'
import { PostsThunks } from 'store/posts/posts-thunks'
import { useAppDispatch, useAppSelector } from 'store/store'

type Props = {
  postId: number
  onCancel: () => void
}

export const EditPostForm: React.FC<Props> = ({ postId, onCancel }) => {
  const dispatch = useAppDispatch()

  const post = useAppSelector(selectPost(postId))

  if (!post) return <span>No Post with such id {postId}</span>

  const onSavePost = async (data: PostFormValues) => {
    const newPost = await dispatch(
      PostsThunks.editPost({
        title: data.title,
        id: post.id,
        likes: post.likes,
        dislikes: post.dislikes
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

  return <PostForm title="Edit a post" post={post} onClose={onCancel} onSubmit={onSavePost} />
}
