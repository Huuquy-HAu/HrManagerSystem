import React from 'react'
import logo from '../../../scss/Rectangle 4.svg'
import ForgotPasswordForm from '../components/ForgotPasswordForm'


interface Props  {}

const ForgotPasswordPage = (props: Props) => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center ">
      <img src={logo} alt="" className="mt-16 w-16 " />
      <h2 className=" text-4xl font-bold">HR Management System</h2>
      <h2 className="mt-28 text-3xl font-bold ">Forgot password</h2>
      <ForgotPasswordForm/>
      <footer className="sticky top-full p-8 text-xs">Copyright © 2022. All Rights Reserved</footer>
    </div>
  )
}

export default ForgotPasswordPage