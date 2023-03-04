import React, { useEffect } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './Modal.css'
import { useOnEscape } from 'hooks/useOnEscape'

type Props = {
  body: React.ReactNode
  footer?: React.ReactNode
  onClose: () => void
}
export const Modal: React.FC<Props> = ({ body, footer, onClose }) => {
  const { escapeClicked } = useOnEscape()

  useEffect(() => {
    if (!escapeClicked) return

    onClose()
  }, [escapeClicked, onClose])

  const onModalContainerClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
  }

  const _onClose = (event: React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => {
    event.stopPropagation()
    onClose()
  }

  return (
    <div className="modal_overlay" onClick={_onClose}>
      <div className="modal_container" onClick={onModalContainerClick}>
        <div className="modal_nav">
          <button onClick={_onClose}>
            <FontAwesomeIcon icon={['fas', 'xmark']} />
          </button>
        </div>
        <div className="modal_body">{body}</div>
        {footer && <div className="modal_footer">{footer}</div>}
      </div>
    </div>
  )
}
