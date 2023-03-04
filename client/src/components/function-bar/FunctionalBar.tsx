import React, { useState } from 'react'
import { CreatePostForm } from 'components/create-post-form/CreatePostForm'
import { FilterPostsDebounce } from 'components/filter-posts/FilterPostsDebounce'
import { Modal } from 'components/modals/Modal'

import './FunctionalBar.css'

export const FunctionalBar = () => {
  const [modalOpen, setModalOpen] = useState(false)

  const onCloseModal = () => {
    setModalOpen(false)
  }

  const openModal = () => {
    setModalOpen(true)
  }

  return (
    <>
      <div className="func_bar">
        <div className="func_bar_box1">
          <FilterPostsDebounce />
        </div>
        <div className="func_bar_box2">
          <button className="my_button" onClick={openModal}>
            Create Post
          </button>
        </div>
      </div>
      {modalOpen && <Modal body={<CreatePostForm onCancel={onCloseModal} />} onClose={onCloseModal} />}
    </>
  )
}
