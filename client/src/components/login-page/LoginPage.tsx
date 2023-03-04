import React from 'react'

import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from 'store/store'
import { AuthActions } from 'store/auth/auth-slice'

import { RegisterOptions, useForm } from 'react-hook-form'
import { ErrorMessage } from 'components/error-message/ErrorMessage'

import myLogo from 'assets/myLogoTran.png'
import './LoginPage.css'

type LoginFormValue = {
  data: string
}

const loginValidation: RegisterOptions = {
  minLength: {
    value: 5,
    message: '*Minimum characters is 5'
  },
  maxLength: {
    value: 15,
    message: '*Maximum characters is 15'
  },
  required: 'Please provide a login'
}

export const LoginPage = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormValue>()

  const login = (data: LoginFormValue) => {
    dispatch(AuthActions.login(data))
    navigate('/')
  }

  return (
    <div className="login_page">
      <div className="login_card">
        <form onSubmit={handleSubmit(login)}>
          <div className="flexCol">
            <img className="my_logo" src={myLogo} alt="" />

            <input className="ojt_input" autoFocus={true} placeholder="Write your login" {...register('data', loginValidation)} />

            <div className="error_container">
              <ErrorMessage type={errors.data?.type} message={errors.data?.message} className="login_error" />
            </div>
            <button className="my_button" type="submit">
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
