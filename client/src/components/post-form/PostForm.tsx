import React, { useMemo } from 'react'

import { RegisterOptions, useForm } from 'react-hook-form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { Post } from 'store/posts/posts.types'
import { ErrorMessage } from 'components/error-message/ErrorMessage'

import './PostForm.css'
import { validatePostImage } from './postFormValidations'

export type PostFormValues = {
  title: string
  postPicture: File[]
}

type Props = {
  title: string
  post?: Post
  img?: any
  onClose: () => void
  onSubmit: (data: PostFormValues) => void
}

const postTitleValidation: RegisterOptions = {
  minLength: {
    value: 2,
    message: '*Minimum characters is 2'
  },
  required: 'Please provide your title'
}

export const PostForm: React.FC<Props> = ({ title, post, onClose, onSubmit }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<PostFormValues>({ mode: 'onChange' })

  const handleOnSubmit = (data: PostFormValues) => {
    onSubmit(data)
  }

  const postPictureValidation: RegisterOptions = {
    required: false,
    validate: value => validatePostImage(value, post)
  }

  const postPicture = watch('postPicture')

  const infoMessage = useMemo(() => {
    const postImageName = postPicture && postPicture[0] ? postPicture[0].name : null
    if (postImageName) return postImageName

    const hasPostImage = post ? post.imageSrc.length > 0 : false
    if (hasPostImage) return 'Image alredy uploaded'

    return null
  }, [post, postPicture])

  return (
    <>
      <div className="title">
        <h2>{title}</h2>
      </div>
      <form className="edit_post_form" onSubmit={handleSubmit(handleOnSubmit)}>
        <div className="form_body">
          <div className="modal_inputs_container">
            <input
              defaultValue={post?.title || ''}
              className="ojt_input ojt_grey"
              type="text"
              {...register('title', postTitleValidation)}
              placeholder={'Write a title post'}
            />
            <input type="file" {...register('postPicture', postPictureValidation)} id="img" multiple={false} className="hidden" />
            <label className="upload_new_pic" htmlFor="img">
              <FontAwesomeIcon icon={['fas', 'file-image']} size="xl" color="grey" />
            </label>
          </div>

          <div className="messages_container">
            {infoMessage && <span className="file_name">{infoMessage}</span>}
            <ErrorMessage type={errors.postPicture?.type} message={errors.postPicture?.message} />
            <ErrorMessage type={errors.title?.type} message={errors.title?.message} />
          </div>
        </div>

        <div className="form_footer">
          <button className="my_button" id="red_button" onClick={onClose}>
            Cancel
          </button>
          <button className="my_button" type="submit">
            Submit
          </button>
        </div>
      </form>
    </>
  )
}
