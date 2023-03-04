import React from 'react'
import { LiteralUnion, RegisterOptions } from 'react-hook-form'

import './ErrorMessage.css'

type Props = {
  type: LiteralUnion<keyof RegisterOptions, string> | undefined
  message: string | undefined
  className?: string
}

export const ErrorMessage: React.FC<Props> = ({ type, message, className }) => {
  if (!message) return null

  return (
    <div className={`error_span_container ${className || ''}`}>
      {type === 'required' ? <span className="error_span_black">{message}</span> : <span className="error_span_red">{message}</span>}
    </div>
  )
}
