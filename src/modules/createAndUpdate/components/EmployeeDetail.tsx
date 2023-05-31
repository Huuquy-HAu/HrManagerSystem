import React, { useState, useEffect } from 'react'
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import CustomInputSelect, { customPaperProps } from './StyleSelected';
import axios from 'axios';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN_KEY } from '../../../utils/constants';
import { IDepartmanetData, IPositionData } from '../../../models/CreatOrUpdate';
import { useSelector } from 'react-redux';
import { getDepartment, getPosition } from '../redux/DepartmentReducer';

interface Props {

}

const EmployeeDetail = (props: Props) => {
    const [department, setDepartMent] = useState<any>()
    const departmentData: IDepartmanetData[] = useSelector(getDepartment)
    const positionData: IPositionData[] = useSelector(getPosition)


    const handleChange = (event: SelectChangeEvent) => {
        console.log(event);
    };


    return (
        <div className='EmployeeDetail bg-white p-3 rounded-xl'>
            <div className="header flex justify-between">
                <h5 className='text-xl font-medium'>Employee Detail</h5>
                <div>Required (<span className='text-red-500 text-xl'>*</span>) </div>
            </div>
            <hr className='my-2' />


            <div className="body">
                <div className='flex w-1/3 justify-between items-center'>
                    <p>Department</p>
                    <div className='w-2/3'>
                        <Select
                            onChange={handleChange}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                            className="h-12 rounded-md bg-input outline-none w-full"
                            input={<CustomInputSelect />}
                            placeholder='Choose Gender'
                            MenuProps={{
                                PaperProps: customPaperProps
                            }}
                        >
                            {departmentData?.map((val: any, ind: any) => {
                                return(
                                    <MenuItem value={val.id} key={ind}>{val.name}</MenuItem>
                                )
                            })}
                        </Select>
                    </div>
                </div>

                <div className='flex w-1/3 justify-between items-center mt-2'>
                    <p>Position</p>
                    <div className='w-2/3'>
                        <Select
                            onChange={handleChange}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                            className="h-12 rounded-md bg-input outline-none w-full"
                            input={<CustomInputSelect />}
                            placeholder='Choose Gender'
                            MenuProps={{
                                PaperProps: customPaperProps
                            }}
                        >

                            {positionData?.map((val: any, ind: any) => {
                                return(
                                    <MenuItem value={val.id} key= {ind}>{val.name}</MenuItem>
                                )
                            })}
                        </Select>
                    </div>
                </div>


                <div>
                    <div>
                        
                    </div>
                </div>
                <div></div>
            </div>
        </div>
    )
}

export default EmployeeDetail