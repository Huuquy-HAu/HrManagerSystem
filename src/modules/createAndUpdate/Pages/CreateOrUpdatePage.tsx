import React, { useState , useEffect } from 'react'
import { Tabs, Tab } from '@mui/material';
import { InputAdornment, Typography } from '@mui/material'
import Button from '@mui/material/Button';
import { Outlet } from 'react-router';
import '../scss/CreateOrUpdatePage.scss'
import EmployeeInformation from '../components/EmployeeInformation';
import { ICreateOrUpdate, ICreateOrUpdateValidation } from '../../../models/CreatOrUpdate';
import { useDispatch, useSelector } from 'react-redux';
import { selectCoU, updateData } from '../redux/CreateOrUpdateReducer';
import { CustomTabMuis } from '../../../component/customStyle/StyleTabs';
import { CustomTabMui } from '../../../component/customStyle/StyleTab';
import ContractInformation from '../components/ContractInformation';
import EmployeeDetail from '../components/EmployeeDetail';
import SalaryandWagePage from '../components/SalaryandWagePage';
import OtherPage from '../components/OtherPage';
import axios from 'axios';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN_KEY } from '../../../utils/constants';
import { setDepartmentData, setMarriageData, setPositionData } from '../redux/DepartmentReducer';


interface Props {
    "data-value"?: boolean
}

export const CreateOrUpdatePage = (props: Props) => {
    const [selectedTab, setSelectedTab] = useState<number>(0);
    const dataCreate: ICreateOrUpdate = useSelector(selectCoU)
    const [validate, setValidate] = useState(false)
    const dispatch = useDispatch()
    const [errorsMessage, setErrorsMessage] = useState<ICreateOrUpdateValidation>({
        name: '',
        card_number: '',
        gender: '',
        mother_name: '',
        dob: '',
        pob: '',
        ktp_no: '',
        nc_id: '',
        home_address_1: '',
        home_address_2: '',
        mobile_no: '',
        tel_no: '',
        marriage_id: '',
        bank_account_no: '',
        bank_name: '',
        family_card_number: '',
        safety_insurance_no: '',
        health_insurance_no: '',
        department_id: '',
        position_id: '',
        shift: '',
        type: '',
        entitle_ot: '',
        meal_allowance_paid: '',
        operational_allowance_paid: '',
        attendance_allowance_paid: '',
        basic_salary: '',
        audit_salary: '',
        safety_insurance: '',
        health_insurance: '',
        meal_allowance: '',
        contract_start_date: '',
        grade_id: '',
        remark: '',
        benefits: '',
        account_user_id: '',
    })


    const validateform = (value: string, tag: string, required: boolean, length: number) => {
        if (value.length === 0 && required) {
            return setErrorsMessage({ ...errorsMessage, [tag]: `Please input ${tag} ` })
        }

        if (value.length > length) {
            return setErrorsMessage({ ...errorsMessage, [tag]: `Maximum length is ${length} characters` })
        }

        return setErrorsMessage({ ...errorsMessage, [tag]: '' })
    }

    const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        console.log(newValue);
        setSelectedTab(newValue);
        if (dataCreate.name) {
            setValidate(true)
        }
        console.log(validate);
    };


    const getDataDefaulCreat = async () => {
        try {
            const [marriageData , departmentData , positionData , defaultSalaryData] = await Promise.all([
                axios.get('https://api-training.hrm.div4.pgtest.co/api/v1/marriage', { headers: { Authorization: `Bearer ${Cookies.get(ACCESS_TOKEN_KEY)}` } }),
                axios.get('https://api-training.hrm.div4.pgtest.co/api/v1/department', { headers: { Authorization: `Bearer ${Cookies.get(ACCESS_TOKEN_KEY)}` } }),
                axios.get('https://api-training.hrm.div4.pgtest.co/api/v1/position', { headers: { Authorization: `Bearer ${Cookies.get(ACCESS_TOKEN_KEY)}` } }),
                axios.get('https://api-training.hrm.div4.pgtest.co/api/v1/employee/get-default-salary', { headers: { Authorization: `Bearer ${Cookies.get(ACCESS_TOKEN_KEY)}` } })
            ])
            dispatch(setMarriageData(marriageData?.data.data))
            dispatch(setDepartmentData(departmentData?.data.data))
            dispatch(setPositionData(positionData?.data.data))
            dispatch(updateData(defaultSalaryData?.data.data))
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getDataDefaulCreat()
    }, [])

    return (
        <div className='CreateOrUpdatePage'>
            <div className="CreateOrUpdate-header">
                <div className="header-left">
                    <Typography variant="h3" style={{ fontSize: 32, fontWeight: '500' }}>
                        Employee Management
                    </Typography>
                </div>
                <div className="header-right">
                    <Button
                        variant="contained"
                        sx={{
                            padding: '8px 22px'
                        }}
                    >
                        Add
                    </Button>
                </div>
            </div>
            <div className="CreateOrUpdate-tab">
                <CustomTabMuis
                    value={selectedTab}
                    onChange={handleTabChange}
                >
                    <CustomTabMui label="Employee Information" valid={validate} />
                    <CustomTabMui label="Contract Information" valid={validate} />
                    <CustomTabMui label="Employment Details" valid={true} />
                    <CustomTabMui label="Salary & Wages" valid={true} />
                    <CustomTabMui label="Others" valid={true} />
                </CustomTabMuis>

                {selectedTab === 0 &&
                    <EmployeeInformation validateform={validateform} errorsMessage={errorsMessage} />
                }
                {selectedTab === 1 &&
                    <ContractInformation />
                }

                {selectedTab === 2 &&
                    <EmployeeDetail />
                }

                {selectedTab === 3 &&
                    <SalaryandWagePage />
                }

                {selectedTab === 4 &&
                    <OtherPage />
                }


            </div>
        </div>
    )
}