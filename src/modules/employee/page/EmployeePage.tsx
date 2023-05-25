import { InputAdornment, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import '../scss/EmployeePage.scss'
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN_KEY } from '../../../utils/constants';
import TableForm from '../component/TableForm';
import { IEmployee } from '../../../models/Employee';
import { useDispatch, useSelector } from 'react-redux';
import { selectEmployeeData, setEmployee } from '../redux/employeeReducer'
import { useLocation, useNavigate } from 'react-router';
import { selectEmployeePageData, setEmployeePage } from '../redux/employeePageDetalReducer';
import { PaginationEmployee } from '../component/PaginationEmployee';

interface Props {

}

interface Iquery {
    search: string,
    page: string
}

const EmployeePage = (props: Props) => {
    const dataEmployee: IEmployee[] = useSelector(selectEmployeeData)
    const dataEmployeePage: any = useSelector(selectEmployeePageData)
    const [query, setQuery] = useState<any>();
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const nav = useNavigate()
    const location = useLocation();
    const setPage= (page: number) => setQuery({...query, page:page})
    const onLoading= () => setLoading(true)
    const offLoading= () => setLoading(false)

    function getQueryParams(queryString: any) {
        const queryParams: any = {};
        const params = queryString.slice(1).split('&');

        for (let param of params) {
            const [key, value] = param.split('=');
            queryParams[key] = value;
        }

        return queryParams;
    }



    const getDataEmployee = async () => {
        onLoading()
        try {
            let objSearch = getQueryParams(location.search)
            const res = await axios.get(
                `https://api-training.hrm.div4.pgtest.co/api/v1/employee${objSearch? (objSearch.search ? objSearch.page ? `?search=${objSearch.search}&page=${objSearch.page}` : `?search=${objSearch.search}`:`` ) :''}`+`${objSearch.page? `?page=${objSearch.page}`:''}`,
                {
                    headers: { Authorization: `Bearer ${Cookies.get(ACCESS_TOKEN_KEY)}` }
                })
            dispatch(setEmployee(res?.data.data.data))
            dispatch(setEmployeePage(res?.data.data))
            offLoading()
        } catch (error) {
            Cookies.remove(ACCESS_TOKEN_KEY)
            offLoading()
            nav('/login')
        }
    }

    const searchData = async () => {
        onLoading()
        try {
            const res = await axios.get(`https://api-training.hrm.div4.pgtest.co/api/v1/employee${query? (query.search ? query.page ? `?search=${query.search}&page=${query.page}` : `?search=${query.search}`:`` ) :''}`+`${query.page? `?page=${query.page}`:''}`, { headers: { Authorization: `Bearer ${Cookies.get(ACCESS_TOKEN_KEY)}` } })
            dispatch(setEmployee(res?.data.data.data))
            dispatch(setEmployeePage(res?.data.data))
            nav(`/employee${query? (query.search ? query.page ? `?search=${query.search}&page=${query.page}` : `?search=${query.search}`:`?page=${query.page}` ) :''}`)
            offLoading()
        } catch (error) {
            offLoading()
        }
    }


    const deleteData = async (dataId: number[]) => {
        try {
            const res = await axios.delete(
                'https://api-training.hrm.div4.pgtest.co/api/v1/employee/multiple-delete',
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get(ACCESS_TOKEN_KEY)}`
                    },
                    data: { record_ids: dataId }
                }
            );


        } catch (error) {

        }
    }

    

    useEffect(() => {
        if (query) {
            const timeoutId = setTimeout(() => {
                console.log("search oke");
                searchData()
            }, 1000);
            return () => clearTimeout(timeoutId)
        }
        getDataEmployee()
    }, [query])

    return (
        <div className='EmployeePage'>
            <div className="EmployeePage-header">
                <div className="header-left">
                    <Typography variant="h3" style={{ fontSize: 32 }}>
                        Employee Management
                    </Typography>
                </div>
                <div className="header-right">
                    <TextField
                        size="small"
                        placeholder="Search..."
                        InputProps={{
                            sx: { borderRadius: "10px", width: "200px", backgroundColor: "white" },
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            )
                        }}
                        onChange={(e) => { setQuery({page: 1, search:e.target.value}); }}
                    />
                </div>
            </div>
            <div className="table-body relative">
                <TableForm dataEmployee={dataEmployee} deleteData={deleteData} loading= {loading} />
            </div>
            <div className="table-footer-pagination">
                <PaginationEmployee dataEmployee={dataEmployeePage} setPage = {setPage} query ={query}/>
            </div>
        </div>
    )
}

export default EmployeePage