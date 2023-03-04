import React, { useState } from 'react'

import { useNavigate } from 'react-router'
import { AuthActions } from 'store/auth/auth-slice'
import { useAppDispatch } from 'store/store'

import './DropDownMenu.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const DropDownMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const logOut = () => {
    setMenuOpen(false)
    dispatch(AuthActions.logout())
    navigate('/login')
  }

  return (
    <div className="logout-dropdown">
      <FontAwesomeIcon color="#0baa62" icon={['fas', 'circle-user']} size="3x" onClick={() => setMenuOpen(!menuOpen)} />

      {menuOpen && (
        <div className="dropdown-menu">
          <button id="red_button" className="dropdown-item my_button" onClick={logOut}>
            <span className="mr">Logout</span>
            <span>
              <FontAwesomeIcon icon={['fas', 'arrow-right-from-bracket']} />
            </span>
          </button>
        </div>
      )}
    </div>
  )
}
