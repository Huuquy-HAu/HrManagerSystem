import React, { useEffect, useState } from 'react'
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import CustomInputSelect, { customPaperProps } from './StyleSelected';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CalenderIcon from '../../../scss/Calendaricon.svg'
import axios from 'axios';
import { ACCESS_TOKEN_KEY } from '../../../utils/constants';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { selectCoU, updateData } from '../redux/CreateOrUpdateReducer';
import { ICreateOrUpdate, ICreateOrUpdateValidation, IGetMarriage } from '../../../models/CreatOrUpdate';
import { useForm } from "react-hook-form";
import { getMarriage } from '../redux/DepartmentReducer';

interface Props {
    validateform(value: string, tag: string, required: boolean, length: number): void,
    errorsMessage: ICreateOrUpdateValidation
}


const EmployeeInformation = (props: Props) => {
    const { validateform, errorsMessage } = props
    const dataCreate: ICreateOrUpdate = useSelector(selectCoU)
    const marriageStatus:IGetMarriage[] = useSelector(getMarriage)
    const [seelectedDate, setSelectedDate] = useState<Date | null>(null);
    const dispatch = useDispatch()
    const { register, handleSubmit, watch, formState: { errors } } = useForm();



    const handleChange = (event: SelectChangeEvent) => {
        dispatch(updateData({ gender: Number(event.target.value) }));
        validateform(dataCreate.gender.toString(), `gender`, true, 50)
    };
    return (
        <div className='PersonalInformation bg-white p-3 rounded-xl'>
            <div className='flex justify-between'>
                <h5>Personal Information</h5>
                <div>Required (<span className='text-red-500 text-xl'>*</span>) </div>
            </div>
            <hr className='my-3' />
            <div className="PersonalInformation-body flex">

                <div className="body-left w-1/2 px-3">
                    <div className="  mb-4 flex items-center justify-between">
                        <label htmlFor="name" className="">
                            Name <span className="text-xl text-red-500">*</span>
                        </label>
                        <div className="flex w-3/5 flex-col">
                            <input
                                type="text"
                                className={!!errorsMessage.name ? "h-12  rounded-md px-2 py-4 outline-none bg-red-50 outline-red-100" : "h-12  rounded-md px-2 py-4 outline-none bg-input"}
                                onChange={(e) => { dispatch(updateData({ name: e.target.value })); validateform(e.target.value, 'name', true, 50) }}
                                value={dataCreate.name}
                            />
                            <small className="pl-3 pt-2 text-left text-red-600">{errorsMessage.name}</small>
                        </div>
                    </div>
                    <div className=" mb-4 flex items-center justify-between">
                        <label className="text-left  ">
                            Gender<span className="text-xl text-red-500">*</span>
                        </label>
                        <div className="flex w-3/5 flex-col">
                            <Select
                                value={dataCreate.gender.toString()}
                                onChange={handleChange}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                                className="h-12 rounded-md bg-input px-2 py-4 outline-none"
                                input={<CustomInputSelect />}
                                placeholder='Choose Gender'
                                MenuProps={{
                                    PaperProps: customPaperProps
                                }}
                            >
                                <MenuItem value={0}>Male</MenuItem>
                                <MenuItem value={1}>Female</MenuItem>
                            </Select>
                            <small className="pl-3 pt-2 text-left text-red-600">{errorsMessage.gender}</small>
                        </div>
                    </div>
                    <div className=" mb-4 flex items-center justify-between">
                        <label htmlFor="name">Mother Name</label>
                        <div className="flex w-3/5 flex-col">
                            <input
                                value={dataCreate.mother_name?.toString()}
                                type="text"
                                className={!!errorsMessage.mother_name ? "h-12  rounded-md px-2 py-4 outline-none bg-red-50 outline-red-100" : "h-12  rounded-md px-2 py-4 outline-none bg-input"}
                                onChange={(e) => { dispatch(updateData({ mother_name: e.target.value })); validateform(e.target.value.toString(), 'mother_name', false, 50) }}
                            />
                            <small className="pl-3 pt-2 text-left text-red-600">{errorsMessage.mother_name}</small>
                        </div>
                    </div>
                    <div className=" mb-4 flex items-center justify-between">
                        <label htmlFor="name">
                            Date of birth<span className="text-xl text-red-500">*</span>
                        </label>
                        <div className="relative  flex h-12 w-3/5 flex-row items-center rounded-md bg-input px-2 py-4 outline-none">
                            <DatePicker
                                selected={seelectedDate}
                                onChange={(date: any) => {
                                    setSelectedDate(date);
                                    dispatch(updateData({ dob: new Date(date).toISOString().split('T')[0] }));
                                    validateform(new Date(date).toISOString().split('T')[0], 'dob', true, 50)
                                }}
                                dateFormat="yyyy/MM/dd"
                                className={!!errorsMessage.dob ? "h-8 w-full px-8 pt-2 outline-none bg-red-50 outline-red-100" : "h-8 w-full bg-input px-8 pt-2 outline-none"}
                                isClearable
                            />
                            <span className=" absolute left-3 top-4">
                                <img src={CalenderIcon} alt="" />
                            </span>
                            <span className="absolute right-3 top-4">
                                <ExpandMoreIcon className="opacity-70" />
                            </span>
                        </div>
                    </div>
                    <div className=" mb-4 flex items-center justify-between">
                        <label htmlFor="name">Place of birth</label>
                        <div className="flex w-3/5 flex-col">
                            <input
                                type="text"
                                value={dataCreate.pob}
                                className={!!errorsMessage.pob ? "h-12  rounded-md px-2 py-4 outline-none bg-red-50 outline-red-100" : "h-12  rounded-md px-2 py-4 outline-none bg-input"}
                                onChange={(e) => { dispatch(updateData({ pob: e.target.value })); validateform(e.target.value.toString(), 'pob', false, 50) }}
                            />
                            <small className="pl-3 pt-2 text-left text-red-600">{errorsMessage.pob}</small>
                        </div>
                    </div>
                    <div className=" mb-4 flex items-center justify-between">
                        <label htmlFor="name">
                            KTP No.
                            <span className="text-xl text-red-500">*</span>
                        </label>
                        <div className="flex w-3/5 flex-col">
                            <input
                                type="number"
                                value={dataCreate.ktp_no ? dataCreate.ktp_no : ''}
                                className={!!errorsMessage.ktp_no ? "h-12  rounded-md px-2 py-4 outline-none bg-red-50 outline-red-100" : "h-12  rounded-md px-2 py-4 outline-none bg-input"}
                                onChange={(e) => { dispatch(updateData({ ktp_no: Number(e.target.value) })); validateform(e.target.value.toString(), 'ktp_no', true, 20) }}
                            />
                            <small className="pl-3 pt-2 text-left text-red-600">{errorsMessage.ktp_no}</small>
                        </div>
                    </div>
                    <div className=" mb-4 flex items-center justify-between">
                        <label htmlFor="name">
                            National Card ID<span className="text-xl text-red-500">*</span>
                        </label>
                        <div className="flex w-3/5 flex-col">
                            <input
                                type="number"
                                value={dataCreate.nc_id ? dataCreate.nc_id : ''}
                                className={!!errorsMessage.nc_id ? "h-12  rounded-md px-2 py-4 outline-none bg-red-50 outline-red-100" : "h-12  rounded-md px-2 py-4 outline-none bg-input"}
                                onChange={(e) => { dispatch(updateData({ nc_id: Number(e.target.value) })); validateform(e.target.value.toString(), 'nc_id', true, 20) }}
                            />
                            <small className="pl-3 pt-2 text-left text-red-600">{errorsMessage.nc_id}</small>
                        </div>
                    </div>
                    <div className=" mb-4 flex items-center justify-between">
                        <label htmlFor="name">Home Address 1</label>
                        <div className="flex w-3/5 flex-col">
                            <input
                                value={dataCreate.home_address_1?.toString()}
                                type="text"
                                className={!!errorsMessage.home_address_1 ? "h-12  rounded-md px-2 py-4 outline-none bg-red-50 outline-red-100" : "h-12  rounded-md px-2 py-4 outline-none bg-input"}
                                onChange={(e) => { dispatch(updateData({ home_address_1: e.target.value })); validateform(e.target.value.toString(), 'home_address_1', false, 100) }}
                            />
                            <small className="pl-3 pt-2 text-left text-red-600">{errorsMessage.home_address_1}</small>
                        </div>
                    </div>
                    <div className=" mb-4 flex items-center justify-between">
                        <label htmlFor="name">Home Address 2</label>
                        <div className="flex w-3/5 flex-col">
                            <input
                                value={dataCreate.home_address_2?.toString()}
                                type="text"
                                className={!!errorsMessage.home_address_2 ? "h-12  rounded-md px-2 py-4 outline-none bg-red-50 outline-red-100" : "h-12  rounded-md px-2 py-4 outline-none bg-input"}
                                onChange={(e) => { dispatch(updateData({ home_address_2: e.target.value })); validateform(e.target.value.toString(), 'home_address_2', false, 100) }}
                            />
                            <small className="pl-3 pt-2 text-left text-red-600">{errorsMessage.home_address_2}</small>
                        </div>
                    </div>
                </div>
                <div className="body-right w-1/2 px-3">
                    <div className="  mb-4 flex items-center justify-between">
                        <label htmlFor="name" className="">
                            Mobile No.
                        </label>
                        <div className="flex w-3/5 flex-col">
                            <input
                                type="number"
                                value={dataCreate.mobile_no ? dataCreate.mobile_no : ''}
                                className={!!errorsMessage.mobile_no ? "h-12  rounded-md px-2 py-4 outline-none bg-red-50 outline-red-100" : "h-12  rounded-md px-2 py-4 outline-none bg-input"}
                                onChange={(e) => { dispatch(updateData({ mobile_no: Number(e.target.value) })); validateform(e.target.value.toString(), 'mobile_no', false, 20) }}
                            />
                            <small className="pl-3 pt-2 text-left text-red-600">{errorsMessage.mobile_no}</small>
                        </div>
                    </div>
                    <div className=" mb-4 flex items-center justify-between">
                        <label className="text-left  ">Tel No.</label>
                        <div className="flex w-3/5 flex-col">
                            <input
                                type="number"
                                value={dataCreate.tel_no ? dataCreate.tel_no : ''}
                                className={!!errorsMessage.tel_no ? "h-12  rounded-md px-2 py-4 outline-none bg-red-50 outline-red-100" : "h-12  rounded-md px-2 py-4 outline-none bg-input"}
                                onChange={(e) => { dispatch(updateData({ tel_no: Number(e.target.value) })); validateform(e.target.value.toString(), 'tel_no', false, 20) }}
                            />
                            <small className="pl-3 pt-2 text-left text-red-600">{errorsMessage.tel_no}</small>
                        </div>
                    </div>

                    <div className=" mb-4 flex items-center justify-between">
                        <label htmlFor="name">Marriage Status</label>
                        <div className="flex w-3/5 flex-col">
                            <Select
                                defaultValue={dataCreate.marriage_id}
                                className={!!errorsMessage.marriage_id ? "h-12  rounded-md px-2 py-4 outline-none bg-red-50 outline-red-100" : "h-12  rounded-md px-2 py-4 outline-none bg-input"}
                                displayEmpty
                                IconComponent={ExpandMoreIcon}
                                input={<CustomInputSelect />}
                                MenuProps={{
                                    PaperProps: customPaperProps
                                }}
                                onChange={(e) => { dispatch(updateData({marriage_id: Number(e.target.value) })); validateform(e.target.value ? e.target.value.toString(): '', 'marriage_id', false, 20) }}
                            >
                                <MenuItem value="">N/A</MenuItem>
                                <MenuItem hidden value="">
                                    Choose Marriage
                                </MenuItem>
                                {marriageStatus?.map((item: any) => (
                                    <MenuItem value={item.id} key={item.id}>
                                        {item.name}
                                    </MenuItem>
                                ))}
                            </Select>
                            <small className="pl-3 pt-2 text-left text-red-600">{errorsMessage.pob}</small>
                        </div>
                    </div>

                    <div className=" mb-4 flex items-center justify-between">
                        <label htmlFor="name">Bank Card No.</label>
                        <div className="flex w-3/5 flex-col">
                            <input
                                type="number"
                                value={dataCreate.card_number ? dataCreate.card_number : ''}
                                className={!!errorsMessage.card_number ? "h-12  rounded-md px-2 py-4 outline-none bg-red-50 outline-red-100" : "h-12  rounded-md px-2 py-4 outline-none bg-input"}
                                onChange={(e) => { dispatch(updateData({ card_number: Number(e.target.value) })); validateform(e.target.value.toString(), 'card_number', false, 30) }}
                            />
                            <small className="pl-3 pt-2 text-left text-red-600">{errorsMessage.card_number}</small>
                        </div>
                    </div>
                    <div className=" mb-4 flex items-center justify-between">
                        <label htmlFor="name">Bank Account No.</label>
                        <div className="flex w-3/5 flex-col">
                            <input
                                type="number"
                                value={dataCreate.bank_account_no ? dataCreate.bank_account_no : ''}
                                className={!!errorsMessage.bank_account_no ? "h-12  rounded-md px-2 py-4 outline-none bg-red-50 outline-red-100" : "h-12  rounded-md px-2 py-4 outline-none bg-input"}
                                onChange={(e) => { dispatch(updateData({ bank_account_no: Number(e.target.value) })); validateform(e.target.value.toString(), 'bank_account_no', false, 30) }}
                            />
                            <small className="pl-3 pt-2 text-left text-red-600">{errorsMessage.bank_account_no}</small>
                        </div>

                    </div>
                    <div className=" mb-4 flex items-center justify-between">
                        <label htmlFor="name">Bank Name</label>
                        <div className="flex w-3/5 flex-col">
                            <input
                                value={dataCreate.bank_name?.toString()}
                                type="text"
                                className={!!errorsMessage.bank_name ? "h-12  rounded-md px-2 py-4 outline-none bg-red-50 outline-red-100" : "h-12  rounded-md px-2 py-4 outline-none bg-input"}
                                onChange={(e) => { dispatch(updateData({ bank_name: e.target.value })); validateform(e.target.value.toString(), 'bank_name', false, 100) }}
                            />
                            <small className="pl-3 pt-2 text-left text-red-600">{errorsMessage.bank_name}</small>
                        </div>

                    </div>
                    <div className=" mb-4 flex items-center justify-between">
                        <label htmlFor="name">Family Card Number</label>
                        <div className="flex w-3/5 flex-col">
                            <input
                                type="number"
                                value={dataCreate.family_card_number ? dataCreate.family_card_number : ''}
                                className={!!errorsMessage.family_card_number ? "h-12  rounded-md px-2 py-4 outline-none bg-red-50 outline-red-100" : "h-12  rounded-md px-2 py-4 outline-none bg-input"}
                                onChange={(e) => { dispatch(updateData({ family_card_number: Number(e.target.value) })); validateform(e.target.value.toString(), 'family_card_number', false, 30) }}
                            />
                            <small className="pl-3 pt-2 text-left text-red-600">{errorsMessage.family_card_number}</small>
                        </div>

                    </div>
                    <div className=" mb-4 flex items-center justify-between">
                        <label htmlFor="name">Safety Insurance No.</label>
                        <div className="flex w-3/5 flex-col">
                            <input
                                type="number"
                                value={dataCreate.safety_insurance_no ? dataCreate.safety_insurance_no : ''}
                                className={!!errorsMessage.safety_insurance_no ? "h-12  rounded-md px-2 py-4 outline-none bg-red-50 outline-red-100" : "h-12  rounded-md px-2 py-4 outline-none bg-input"}
                                onChange={(e) => { dispatch(updateData({ safety_insurance_no: Number(e.target.value) })); validateform(e.target.value.toString(), 'safety_insurance_no', false, 30) }}
                            />
                            <small className="pl-3 pt-2 text-left text-red-600">{errorsMessage.safety_insurance_no}</small>
                        </div>
                    </div>
                    <div className=" mb-4 flex items-center justify-between">
                        <label htmlFor="name">Health Insurance No.</label>
                        <div className="flex w-3/5 flex-col">
                            <input
                                type="number"
                                value={dataCreate.health_insurance_no ? dataCreate.health_insurance_no : ''}
                                className={!!errorsMessage.health_insurance_no ? "h-12  rounded-md px-2 py-4 outline-none bg-red-50 outline-red-100" : "h-12  rounded-md px-2 py-4 outline-none bg-input"}
                                onChange={(e) => { dispatch(updateData({ health_insurance_no: Number(e.target.value) })); validateform(e.target.value.toString(), 'health_insurance_no', false, 30) }}
                            />
                            <small className="pl-3 pt-2 text-left text-red-600">{errorsMessage.health_insurance_no}</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmployeeInformation;