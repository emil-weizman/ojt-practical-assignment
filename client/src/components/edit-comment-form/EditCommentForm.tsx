import React from 'react'

import { RegisterOptions, useForm } from 'react-hook-form'

import { selectComment } from 'store/posts/posts-slice'
import { PostsThunks } from 'store/posts/posts-thunks'
import { useAppDispatch, useAppSelector } from 'store/store'

import { ErrorMessage } from 'components/error-message/ErrorMessage'

import './EditCommentForm.css'

type EditCommentFormType = {
  text: string
}

type Props = {
  commentId: number
  onCancel: () => void
}

const commentValidation: RegisterOptions = {
  required: 'Please provide your title'
}

export const EditCommentForm: React.FC<Props> = ({ commentId, onCancel }) => {
  const dispatch = useAppDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<EditCommentFormType>()
  const comment = useAppSelector(selectComment(commentId))

  if (!comment) return <span>No comment available</span>

  const onSaveComment = (data: EditCommentFormType) => {
    let newComment = { ...comment, text: data.text }

    dispatch(PostsThunks.editComment(newComment))
    onCancel()
  }

  return (
    <div className="edit_comment_container">
      <h2>Edit your comment</h2>

      <form className="edit_comment_form" onSubmit={handleSubmit(onSaveComment)}>
        <input
          className="ojt_input ojt_grey"
          {...register('text', commentValidation)}
          type="text"
          defaultValue={comment.text}
          placeholder="Edit your comment"
        />

        <ErrorMessage type={errors.text?.type} message={errors.text?.message} />

        <div className="edit_comments_buttons">
          <button id="red_button" className="my_button" onClick={onCancel}>
            Cancel
          </button>
          <button className="my_button" type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  )
}
