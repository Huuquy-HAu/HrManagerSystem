import React, { useState, useEffect } from 'react'
import { Typography } from '@mui/material'
import Button from '@mui/material/Button';
import { useNavigate, useParams } from 'react-router';
import '../scss/CreateOrUpdatePage.scss'
import EmployeeInformation from '../components/EmployeeInformation';
import { ICreateOrUpdate, ICreateOrUpdateValidation, IImgCreatContract, IOtherFormDataFile, Ibenefits } from '../../../models/CreatOrUpdate';
import { useDispatch, useSelector } from 'react-redux';
import { removeAllFormData, resetData, selectCoU, selectContractFileFormData, selectOtherFileFormData, setData, updateData } from '../redux/CreateOrUpdateReducer';
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
import errorIcon from '../../../scss/errorIcon.svg'
import { message } from 'antd';
import { BASE_URL, getAPI } from '../../../configs/api';
import CircularProgress from '@mui/material/CircularProgress';


interface Props {
    "data-value"?: boolean
}

export const CreateOrUpdatePage = (props: Props) => {
    const nav = useNavigate()
    const [selectedTab, setSelectedTab] = useState<number>(0);
    const dataCreate: ICreateOrUpdate = useSelector(selectCoU)
    const contractFileFormData: IImgCreatContract = useSelector(selectContractFileFormData)
    const otherFileFormData: IOtherFormDataFile = useSelector(selectOtherFileFormData)
    const [validateEmploy, setValidateEmploy] = useState<boolean>(false)
    const [validContract, setValidcontract] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false);
    const [dataOrtherPage, setDataOrtherPage] = useState({
        grade: [],
        benefits: []
    });
    const { id } = useParams()
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
        if (selectedTab == 0) {
            if (dataCreate.name &&
                (dataCreate.gender == 0 || dataCreate.gender == 1) &&
                dataCreate.dob &&
                dataCreate.ktp_no &&
                dataCreate.nc_id) {
                setValidateEmploy(true)
                setSelectedTab(newValue);
                return;
            }
            setValidateEmploy(false)
        }

        if (selectedTab == 1) {
            if (dataCreate.contract_start_date &&
                dataCreate.type.toString()) {
                setValidcontract(true)
                setSelectedTab(newValue);
                return;
            }
            setValidcontract(false)
        }

        setSelectedTab(newValue);
    };


    const CreatData = async () => {
        try {
            if (id) {
                const res = await axios.put("https://api-training.hrm.div4.pgtest.co/api/v1/employee", dataCreate, { headers: { Authorization: `Bearer ${Cookies.get(ACCESS_TOKEN_KEY)}` } })
                setLoading(true)
                if (dataCreate.documents.length) {
                    const formdata = new FormData();
                    formdata.append("employee_id", res.data.data.id);
                    otherFileFormData.documents.forEach((doc: any) => formdata.append("documents[]", doc, doc.name));

                    await axios.post(`https://api-training.hrm.div4.pgtest.co/api/v1/employee-document/upload`, formdata, {
                        headers: { Authorization: `Bearer ${Cookies.get(ACCESS_TOKEN_KEY)}` }
                    });
                }

                if (dataCreate.contracts) {
                    const formdata = new FormData();
                    formdata.append("employee_id", res.data.data.id);
                    contractFileFormData.names.forEach((name) => formdata.append("names[]", name));
                    contractFileFormData.contract_dates.forEach((date) => formdata.append("contract_dates[]", date.toString().split('T')[0]));
                    contractFileFormData.documents.forEach((doc: any) => formdata.append("documents[]", doc, doc.name));
                    formdata.append("modified_contracts[]", "");
                    await axios.post(`https://api-training.hrm.div4.pgtest.co/api/v1/contract/save-multiple`, formdata, {
                        headers: { Authorization: `Bearer ${Cookies.get(ACCESS_TOKEN_KEY)}` }
                    });
                }
                message.success(res?.data.message)
                dispatch(resetData())
                nav('/employee')
                message.success(res?.data.message)
                setLoading(false)
                dispatch(resetData())
                nav('/employee')

            } else {
                setLoading(true)
                const res = await axios.post("https://api-training.hrm.div4.pgtest.co/api/v1/employee", dataCreate, { headers: { Authorization: `Bearer ${Cookies.get(ACCESS_TOKEN_KEY)}` } })
                if (dataCreate.documents.length) {
                    const formdata = new FormData();
                    formdata.append("employee_id", res.data.data.id);
                    otherFileFormData.documents.forEach((doc: any) => formdata.append("documents[]", doc, doc.name));

                    await axios.post(`https://api-training.hrm.div4.pgtest.co/api/v1/employee-document/upload`, formdata, {
                        headers: { Authorization: `Bearer ${Cookies.get(ACCESS_TOKEN_KEY)}` }
                    });
                }

                if (dataCreate.contracts.length) {
                    const formdata = new FormData();
                    formdata.append("employee_id", res.data.data.id);
                    contractFileFormData.names.forEach((name) => formdata.append("names[]", name));
                    contractFileFormData.contract_dates.forEach((date) => formdata.append("contract_dates[]", date.toString().split('T')[0]));
                    contractFileFormData.documents.forEach((doc: any) => formdata.append("documents[]", doc, doc.name));
                    formdata.append("modified_contracts[]", "");
                    await axios.post(`https://api-training.hrm.div4.pgtest.co/api/v1/contract/save-multiple`, formdata, {
                        headers: { Authorization: `Bearer ${Cookies.get(ACCESS_TOKEN_KEY)}` }
                    });
                }
                message.success(res?.data.message)
                dispatch(resetData())
                setLoading(false)
                nav('/employee')
            }

        } catch (error) {
            console.log(error);
        }
    }

    const getDataEmployee = async () => {
        try {
            dispatch(removeAllFormData())
            const res = await getAPI(`/employee/${id}`)
            const benefits = res?.data.data.benefits;
            dispatch(setData(res?.data.data))
            if (benefits) {
                const benefitIds = benefits.map((obj:Ibenefits )=> obj.id); // Mảng chỉ chứa id
                dispatch(updateData({benefits: benefitIds}))
            }
            getDataDefaulCreat()
        } catch (error) {
            console.log(error);
        }
    }


    const handleAddOrUpdate = () => {
        CreatData()
    }
    const getDataDefaulCreat = async () => {
        try {
            if (!id) {
                dispatch(resetData())
                dispatch(removeAllFormData())
            }
            const [marriageData, departmentData, positionData, defaultSalaryData, gradeRes, benefitRes] = await Promise.all([
                axios.get(`${BASE_URL}/marriage`, { headers: { Authorization: `Bearer ${Cookies.get(ACCESS_TOKEN_KEY)}` } }),
                axios.get(`${BASE_URL}/department`, { headers: { Authorization: `Bearer ${Cookies.get(ACCESS_TOKEN_KEY)}` } }),
                axios.get(`${BASE_URL}/position`, { headers: { Authorization: `Bearer ${Cookies.get(ACCESS_TOKEN_KEY)}` } }),
                axios.get(`${BASE_URL}/employee/get-default-salary`, { headers: { Authorization: `Bearer ${Cookies.get(ACCESS_TOKEN_KEY)}` } }),
                axios.get(`${BASE_URL}/grade`, { headers: { Authorization: `Bearer ${Cookies.get(ACCESS_TOKEN_KEY)}` } }),
                axios.get(`${BASE_URL}/benefit`, { headers: { Authorization: `Bearer ${Cookies.get(ACCESS_TOKEN_KEY)}` } })
            ])
            dispatch(setMarriageData(marriageData?.data.data))
            dispatch(setDepartmentData(departmentData?.data.data))
            dispatch(setPositionData(positionData?.data.data))
            dispatch(updateData(defaultSalaryData?.data.data))
            setDataOrtherPage({
                grade: gradeRes.data.data,
                benefits: benefitRes.data.data
            })

        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        if (id) {
            getDataEmployee()
        } else {
            getDataDefaulCreat()
        }

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
                        disabled={validateEmploy === false || validContract === false }
                        variant="contained"
                        sx={{
                            padding: '8px 22px'
                        }}
                        onClick={handleAddOrUpdate}
                        startIcon={loading ? <CircularProgress size={20} /> : null}
                    >
                        {id ? 'Save Change' : 'Add'}
                    </Button>
                </div>
            </div>
            <div className="CreateOrUpdate-tab">
                <CustomTabMuis
                    value={selectedTab}
                    onChange={handleTabChange}
                >
                    <CustomTabMui
                        label={
                            <div className="flex items-center">
                                Employee Information
                                {validateEmploy ? '' :
                                    <span className="ml-2">
                                        <img src={errorIcon} />
                                    </span>
                                }
                            </div>
                        }
                        valid={validateEmploy}
                    />
                    <CustomTabMui
                        label={
                            <div className="flex items-center">
                                Contract Information
                                {validContract ? '' :
                                    <span className="ml-2">
                                        <img src={errorIcon} />
                                    </span>
                                }
                            </div>
                        }
                        valid={validContract}
                    />
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
                    <OtherPage dataOrtherPage={dataOrtherPage} />
                }


            </div>
        </div>
    )
}