import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ROUTES } from './configs/routes'
import { LoginPage } from './modules/auth/pages/LoginPage'
import HomePage from './modules/home/pages/HomePage'
import EmployeePage from './modules/employee/page/EmployeePage'
import ProtectedRoute from './modules/common/component/ProtectedRoute'
import PrivateRoute from './modules/common/component/PrivateRoute'
import { CreateOrUpdatePage } from './modules/createAndUpdate/Pages/CreateOrUpdatePage'
import ForgotPasswordPage from './modules/auth/pages/ForgotPasswordPage'

interface Props {

}

function Routers(props: Props) {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={ROUTES.login} element={<PrivateRoute />}>
                    <Route path={ROUTES.login} element={<LoginPage />} />
                </Route>


                <Route path={ROUTES.forgotPassword} element={<PrivateRoute />}>
                    <Route path={ROUTES.forgotPassword} element={<ForgotPasswordPage />} />
                </Route>

                <Route path='/' element={<ProtectedRoute />}>
                    <Route path={ROUTES.home} element={<HomePage />} >
                        <Route path={ROUTES.employee} element={<EmployeePage />} />
                        <Route path={ROUTES.createOrUpdate} element={<CreateOrUpdatePage />}/>
                        <Route path={ROUTES.createOrUpdate+'/:id'} element={<CreateOrUpdatePage />}/>
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Routers