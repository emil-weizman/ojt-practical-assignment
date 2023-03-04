import React from 'react'

import { DropDownMenu } from 'components/drop-down-menu/DropDownMenu'

import { selectAuth } from 'store/auth/auth-slice'
import { useAppSelector } from 'store/store'

import './Header.css'

import logoImg from '../../assets/myLogoTran.png'

export const Header = () => {
  const { userName } = useAppSelector(selectAuth)

  return (
    <div className="header_container">
      <div className="header_row">
        <span className="header_span">Welcome, {userName}!</span>
        <div>
          <img className="logo" src={logoImg} alt="" />
        </div>

        <DropDownMenu />
      </div>
    </div>
  )
}
