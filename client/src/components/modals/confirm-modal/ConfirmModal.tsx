import React from 'react'

import './ConfirmModal.css'

type Props = {
  onConfirm: (confirm: boolean) => void
}

export const ConfirmModal: React.FC<Props> = ({ onConfirm }) => {
  return (
    <div className="confirm_container">
      <h2 className="confirm_title">Are you sure?</h2>
      <div className="confirm_buttons">
        <button id="red_button" className="my_button" onClick={() => onConfirm(true)}>
          Yes
        </button>
        <button className="my_button" onClick={() => onConfirm(false)}>
          Cancel
        </button>
      </div>
    </div>
  )
}
