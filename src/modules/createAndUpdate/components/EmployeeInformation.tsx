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
import { useDispatch } from 'react-redux';
import { updateData } from '../redux/CreateOrUpdateReducer';


interface Props {

}


export const EmployeeInformation = (props: Props) => {

    const [age, setAge] = useState<string>('');
    const [seelectedDate, setSelectedDate] = useState<Date|null>(null);
    const [marriageStatus, setmarriageStatus] = useState<any>([])
    const dispatch = useDispatch()

    const getMarriagateStatus = async() => {
        const res = await axios.get('https://api-training.hrm.div4.pgtest.co/api/v1/marriage',{ headers: { Authorization: `Bearer ${Cookies.get(ACCESS_TOKEN_KEY)}` } })
        console.log(res);
        setmarriageStatus([...res.data.data])
    }

    useEffect(() => {
        getMarriagateStatus()
    }, [])

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value);
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
                            Name<span className="text-xl text-red-500">*</span>
                        </label>
                        <div className="flex w-3/5 flex-col">
                            <input 
                                type="text" 
                                className="h-12  rounded-md bg-input px-2 py-4 outline-none" 
                                onChange={(e) => {dispatch(updateData({name: e.target.value}));}}
                                />
                            {/* <small className="pl-3 pt-2 text-left text-red-600">Please input Name</small> */}
                        </div>
                    </div>
                    <div className=" mb-4 flex items-center justify-between">
                        <label className="text-left  ">
                            Gender<span className="text-xl text-red-500">*</span>
                        </label>
                        <div className="flex w-3/5 flex-col">
                            <Select
                                value={age}
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
                        </div>
                    </div>
                    <div className=" mb-4 flex items-center justify-between">
                        <label htmlFor="name">Mother Name</label>
                        <input type="text" className="flex  h-12 w-3/5 flex-col rounded-md bg-input px-2 py-4 outline-none" />
                    </div>
                    <div className=" mb-4 flex items-center justify-between">
                        <label htmlFor="name">
                            Date of birth<span className="text-xl text-red-500">*</span>
                        </label>
                        <div className="relative  flex h-12 w-3/5 flex-row items-center rounded-md bg-input px-2 py-4 outline-none">
                            <DatePicker
                                selected={seelectedDate}
                                onChange={(date: any) => setSelectedDate(date)}
                                dateFormat="yyyy/MM/dd"
                                className="h-8 w-full bg-input px-8 pt-2 outline-none"
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
                        <input type="text" className="flex  h-12 w-3/5 flex-col rounded-md bg-input px-2 py-4 outline-none" />
                    </div>
                    <div className=" mb-4 flex items-center justify-between">
                        <label htmlFor="name">
                            KTP No.
                            <span className="text-xl text-red-500">*</span>
                        </label>
                        <input type="number" className="flex  h-12 w-3/5 flex-col rounded-md bg-input px-2 py-4 outline-none" />
                    </div>
                    <div className=" mb-4 flex items-center justify-between">
                        <label htmlFor="name">
                            National Card ID<span className="text-xl text-red-500">*</span>
                        </label>
                        <input type="number" className="flex  h-12 w-3/5 flex-col rounded-md bg-input px-2 py-4 outline-none" />
                    </div>
                    <div className=" mb-4 flex items-center justify-between">
                        <label htmlFor="name">Home Address 1</label>
                        <input type="text" className="flex  h-12 w-3/5 flex-col rounded-md bg-input px-2 py-4 outline-none" />
                    </div>
                    <div className=" mb-4 flex items-center justify-between">
                        <label htmlFor="name">Home Address 2</label>
                        <input type="text" className="flex  h-12 w-3/5 flex-col rounded-md bg-input px-2 py-4 outline-none" />
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
                                className="h-12  rounded-md bg-input px-2 py-4 outline-none"
                            />
                        </div>
                    </div>
                    <div className=" mb-4 flex items-center justify-between">
                        <label className="text-left  ">Tel No.</label>
                        <div className="flex w-3/5 flex-col">
                            <input type="number" className="h-12  rounded-md bg-input px-2 py-4 outline-none" />
                        </div>
                    </div>

                    <div className=" mb-4 flex items-center justify-between">
                        <label htmlFor="name">Marriage Status</label>
                        <div className="flex w-3/5 flex-col">
                            <Select
                                defaultValue=""
                                className="h-12  rounded-md bg-input px-2 py-4 outline-none"
                                displayEmpty
                                IconComponent={ExpandMoreIcon}
                                input={<CustomInputSelect />}
                                MenuProps={{
                                    PaperProps: customPaperProps
                                }}
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
                        </div>
                    </div>

                    <div className=" mb-4 flex items-center justify-between">
                        <label htmlFor="name">Bank Card No.</label>
                        <input type="number" className="flex  h-12 w-3/5 flex-col rounded-md bg-input px-2 py-4 outline-none" />
                    </div>
                    <div className=" mb-4 flex items-center justify-between">
                        <label htmlFor="name">Bank Account No.</label>
                        <input type="number" className="flex  h-12 w-3/5 flex-col rounded-md bg-input px-2 py-4 outline-none" />
                    </div>
                    <div className=" mb-4 flex items-center justify-between">
                        <label htmlFor="name">Bank Name</label>
                        <input type="text" className="flex  h-12 w-3/5 flex-col rounded-md bg-input px-2 py-4 outline-none" />
                    </div>
                    <div className=" mb-4 flex items-center justify-between">
                        <label htmlFor="name">Family Card Number</label>
                        <input type="text" className="flex  h-12 w-3/5 flex-col rounded-md bg-input px-2 py-4 outline-none" />
                    </div>
                    <div className=" mb-4 flex items-center justify-between">
                        <label htmlFor="name">Safety Insurance No.</label>
                        <input type="number" className="flex  h-12 w-3/5 flex-col rounded-md bg-input px-2 py-4 outline-none" />
                    </div>
                    <div className=" mb-4 flex items-center justify-between">
                        <label htmlFor="name">Health Insurance No.</label>
                        <input type="number" className="flex  h-12 w-3/5 flex-col rounded-md bg-input px-2 py-4 outline-none" />
                    </div>
                </div>
            </div>
        </div>
    )
}