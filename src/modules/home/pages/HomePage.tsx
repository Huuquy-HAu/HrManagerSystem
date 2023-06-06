import React, { useEffect } from 'react'
import { Header } from '../components/Header'
import '../scss/Header.scss'
import '../scss/HomePage.scss'
import SideBar from '../components/SideBar'
import Typography from '@mui/material/Typography';
import { Outlet } from 'react-router'
import { Footer } from '../components/Footer'
import BreadCrumbs from '../components/BreadCrumbs'

interface Props {

}

const HomePage = (props: Props) => {

  return (
    <>
      <Header />
      <div className="HomePage-body">
        <div className="HomePage-body-left">
          <SideBar />
        </div>
        <div className="HomePage-body-right">
          <BreadCrumbs />
          <Outlet />
          <Footer />
        </div>
      </div>
    </>
  )
}

export default HomePage