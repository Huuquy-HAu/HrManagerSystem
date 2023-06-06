import React from 'react'
import '../scss/LoginPage.scss';
import Cookies from 'js-cookie';
import logo from '../../../scss/Rectangle 4.svg'
import { LoginForm } from '../components/LoginForm'
import { IloginParams } from '../../../models/LoginForm'
import axios from 'axios'
import { RESPONSE_STATUS_SUCCESS } from '../../../utils/httpResponseCode'
import { ACCESS_TOKEN_KEY } from '../../../utils/constants'
import { notification } from 'antd';
import { WarningOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';

interface Props {

}

export const LoginPage = (props: Props) => {
  const nav = useNavigate()

  const onLogin = async (values: IloginParams) => {
    try {
      const res = await axios.post("https://api-training.hrm.div4.pgtest.co/api/v1/login", { username: values.username, password: values.password, company_id: values.company_id }, { headers: { "Content-Type": "multipart/form-data" } })
      console.log(res);
      if (res?.status === RESPONSE_STATUS_SUCCESS) {
        Cookies.set(ACCESS_TOKEN_KEY, res.data.data.token, { expires: 1 });
        nav('/')

      }
    } catch (error) {
      notification.error({
        message:"Incorrect Username, Password or Factory. Please try again!",
        icon: <WarningOutlined style={{color: "red"}} />
      })
      console.log(error);
    }
  }

  return (
    <div className='LoginPage'>
      <div className="header-LoginPage">
        <img src={logo} alt="" />
        <p>HR Management System</p>
      </div>
      <div className="body-LoginPage">
        <p>Login</p>
        <LoginForm onLogin={onLogin} />
      </div>
    </div>
  )
}
