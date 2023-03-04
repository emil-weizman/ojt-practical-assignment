import React from 'react'

import './Paginator.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type Props = {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export const Paginator: React.FC<Props> = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="paginator">
      <button disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
        <FontAwesomeIcon icon={['fas', 'angles-left']} size="xl" />
      </button>
      <span>{currentPage}</span>
      <button disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>
        <FontAwesomeIcon icon={['fas', 'angles-right']} size="xl" />
      </button>
    </div>
  )
}
