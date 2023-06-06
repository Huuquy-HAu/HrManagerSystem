import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import CustomInputSelect, { customPaperProps } from './StyleSelected';
import { IDepartmanetData, IPositionData } from '../../../models/CreatOrUpdate';
import { useDispatch, useSelector } from 'react-redux';
import { getDepartment, getPosition } from '../redux/DepartmentReducer';
import { ChecBoxCustom } from '../../../component/customStyle/CheckBoxCustom';
import { ReactComponent as CheckBoxIcon } from "../../../scss/checkBoxIcon.svg";
import { ICreateOrUpdate } from '../../../models/CreatOrUpdate';
import { selectCoU, updateData } from '../redux/CreateOrUpdateReducer';


interface Props {

}

const EmployeeDetail = (props: Props) => {
    const departmentData: IDepartmanetData[] = useSelector(getDepartment)
    const positionData: IPositionData[] = useSelector(getPosition)
    const dispatch = useDispatch()
    const dataCreate: ICreateOrUpdate = useSelector(selectCoU)

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
                            onChange={(e) => {
                                dispatch(updateData({ department_id: e.target.value ? e.target.value : null }))
                            }}
                            defaultValue={0}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                            className="h-12 rounded-md bg-input outline-none w-full"
                            input={<CustomInputSelect />}
                            placeholder='Choose Gender'
                            MenuProps={{
                                PaperProps: customPaperProps
                            }}
                        >
                            <MenuItem hidden value={0}>
                                Choose Department
                            </MenuItem>
                            {departmentData?.map((val: any, ind: any) => {
                                return (
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
                            onChange={(e) => {
                                dispatch(updateData({ position_id: e.target.value ? e.target.value : null }))
                            }}
                            defaultValue={0}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                            className="h-12 rounded-md bg-input outline-none w-full"
                            input={<CustomInputSelect />}
                            placeholder='Choose Gender'
                            MenuProps={{
                                PaperProps: customPaperProps
                            }}
                        >
                            <MenuItem hidden value={0}>
                                Choose Position
                            </MenuItem>
                            {positionData?.map((val: any, ind: any) => {
                                return (
                                    <MenuItem value={val.id} key={ind}>{val.name}</MenuItem>
                                )
                            })}
                        </Select>
                    </div>
                </div>

                <div className='flex w-1/3 items-center mt-2'>
                    <ChecBoxCustom
                        checked={dataCreate.entitle_ot}
                        onChange={() => {
                            dispatch(updateData({ entitle_ot: !dataCreate.entitle_ot }))
                            dispatch(updateData({ operational_allowance_paid: dataCreate.entitle_ot }))
                            dispatch(updateData({ attendance_allowance_paid: dataCreate.entitle_ot }))
                        }}
                        icon={<CheckBoxIcon stroke={"#DFE3E6"} fill={"white"} />}
                    />
                    <label htmlFor="">
                        Entitled OT
                    </label>
                </div>

                <div className='flex w-1/3 items-center mt-2'>
                    <ChecBoxCustom
                        checked={dataCreate.meal_allowance_paid}
                        onChange={() => {
                            dispatch(updateData({ meal_allowance_paid: !dataCreate.meal_allowance_paid }))
                        }}
                        icon={<CheckBoxIcon stroke={"#DFE3E6"} fill={"white"} />}
                    />
                    <label htmlFor="">
                        Meal Allowance Paid
                    </label>
                </div>

                <div className='flex w-1/3 items-center mt-2'>
                    <ChecBoxCustom
                        disabled
                        checked={dataCreate.operational_allowance_paid}
                        icon={<CheckBoxIcon stroke={"#DFE3E6"} fill={"#F1F3F5"} />}
                    />
                    <label htmlFor="">
                        Operational Allowance Paid
                    </label>
                </div>

                <div className='flex w-1/3 items-center mt-2'>
                    <ChecBoxCustom
                        disabled
                        checked={dataCreate.attendance_allowance_paid}
                        icon={<CheckBoxIcon stroke={"#DFE3E6"} fill={"#F1F3F5"} />}
                    />
                    <label htmlFor="">
                        Attendance Allowance Paid
                    </label>
                </div>
            </div>
        </div>
    )
}

export default EmployeeDetail