import { InputCustom } from '../../../component/customStyle/InputCustom'
import { InputAdornment } from "@mui/material";
import { ICreateOrUpdate } from '../../../models/CreatOrUpdate';
import { selectCoU } from '../redux/CreateOrUpdateReducer';
import { useSelector } from 'react-redux';


interface Props { }

const SalaryandWagePage = (props: Props) => {
    const dataCreate: ICreateOrUpdate = useSelector(selectCoU)

    return (
        <div className='SalaryandWagePage  bg-white p-3 rounded-xl h-600'>
            <div className="header flex justify-between">
                <h5 className='text-xl font-medium'>Salary & Wage</h5>
                <div>Required (<span className='text-red-500 text-xl'>*</span>) </div>
            </div>

            <hr className='my-2' />

            <div className="body">
                <div className=' w-2/5 flex justify-between items-center py-1'>
                    <label htmlFor="">Basic Salary
                        <span className="text-xl text-red-500">*</span>
                    </label>
                    <InputCustom
                        value={dataCreate.basic_salary}
                        disableUnderline
                        type='number'
                        startAdornment={
                            <InputAdornment position="start">
                                <p className="text-blue-600">Rp</p>
                            </InputAdornment>
                        }
                    />
                </div>

                <div className=' w-2/5 flex justify-between items-center py-1'>
                    <label htmlFor="">Basic Salary (Audit)
                        <span className="text-xl text-red-500">*</span>
                    </label>
                    <InputCustom
                        value={dataCreate.audit_salary}
                        disableUnderline
                        type='number'
                        startAdornment={
                            <InputAdornment position="start">
                                <p className="text-blue-600">Rp</p>
                            </InputAdornment>
                        }
                    />
                </div>

                <div className=' w-2/5 flex justify-between items-center py-1'>
                    <label htmlFor="">Safety Insurance
                        <span className="text-xl text-red-500">*</span>
                    </label>
                    <InputCustom
                        value={dataCreate.safety_insurance}
                        disableUnderline
                        type='number'
                        startAdornment={
                            <InputAdornment position="start">
                                <p className="text-blue-600">Rp</p>
                            </InputAdornment>
                        }
                    />
                </div>

                <div className=' w-2/5 flex justify-between items-center py-1'>
                    <label htmlFor="">Healthy Insurance</label>
                    <InputCustom
                        value={dataCreate.health_insurance}
                        disableUnderline
                        type='number'
                        startAdornment={
                            <InputAdornment position="start">
                                <p className="text-blue-600">Rp</p>
                            </InputAdornment>
                        }
                    />
                </div>

                <div className=' w-2/5 flex justify-between items-center py-1'>
                    <label htmlFor="">Meal Allowance
                        <span className="text-xl text-red-500">*</span>
                    </label>
                    <InputCustom
                        disableUnderline
                        type='number'
                        startAdornment={
                            <InputAdornment position="start">
                                <p className="text-blue-600">Rp</p>
                            </InputAdornment>
                        }
                    />
                </div>

            </div>
        </div>
    )
}

export default SalaryandWagePage