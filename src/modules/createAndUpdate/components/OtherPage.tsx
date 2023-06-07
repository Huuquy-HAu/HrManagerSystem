import React from 'react'
import { ICreateOrUpdate, IOtherUpload } from '../../../models/CreatOrUpdate'
import { TextAreaCustom } from '../../../component/customStyle/TextAreaCustom'
import { useDispatch, useSelector } from 'react-redux'
import { addOtherFormDataFile, selectCoU, updateData } from '../redux/CreateOrUpdateReducer'
import { Button } from '@mui/material'
import { Form } from 'react-bootstrap';
import {  Select } from 'antd';
import type { SelectProps } from 'antd';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import moment from 'moment'
import TableOrther from './TableOrther'

interface Props {
    dataOrtherPage: any
}

const OtherPage = (props: Props) => {
    const { dataOrtherPage } = props
    const dataCreate: ICreateOrUpdate = useSelector(selectCoU)
    const dispatch = useDispatch()
    const options: SelectProps['options'] = [];

    dataOrtherPage.benefits.map((value: any) => {
        options.push({ value: value.id, label: value.name })
    })

    const handleChange = (event: any) => {
        const selectedValue = event.target.value;
        const selectedOption = dataOrtherPage.grade.find((option: any) => option.id === Number(selectedValue));
        dispatch(updateData({ grade: selectedOption }))
        dispatch(updateData({ grade_id: Number(selectedValue) }))
    };

    const handleChangeBenefit = (value: number[]) => {
        dispatch(updateData({ benefits: value }))
    };

    const handleUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files && e.target.files[0];
        if (selectedFile) {
            const newValue: IOtherUpload = {
                id: selectedFile.lastModified,
                employee_id: 100,
                created_at: moment(selectedFile.lastModified).format("YYYY-MM-DD"),
                document: selectedFile.name,
                updated_at: null
            };
              dispatch(addOtherFormDataFile({ employee_id: 1, documents: [selectedFile] }));
              dispatch(updateData({documents : [newValue, ...dataCreate.documents] }));
        }
    };


    return (
        <div className='OtherPage  bg-white p-3 rounded-xl '>
            <div className="header flex justify-between">
                <h5 className='text-xl font-medium'>Others</h5>
                <div>Required (<span className='text-red-500 text-xl'>*</span>) </div>
            </div>

            <hr className='my-2' />

            <div className="body">
                <div className='flex items-center w-3/5 justify-between'>
                    <label>
                        Grade
                    </label>
                    <div className='w-3/5'>
                        <Form.Select
                            onChange={handleChange}
                            value={dataCreate.grade_id || ''}
                            placeholder=''
                            className='other-select px-2 py-3'
                        >
                            <option value='' hidden> </option>
                            {dataOrtherPage.grade.map((value: any) => {
                                return (
                                    <option value={value.id} key={value.id}>{value.name}</option>
                                )
                            })}
                        </Form.Select>
                    </div>
                </div>
                {!!dataCreate.grade?.benefits && (
                    <div className='flex items-center w-3/5 justify-end my-2'>
                        <div className=""></div>
                        {dataCreate.grade?.benefits.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center h-6 rounded-md bg-benefitItem text-xs text-gray bg-slate-300 px-2 mx-1"
                            >
                                    {item.name}
                            </div>
                        ))}
                    </div>
                )}

                <div className=" flex items-center w-3/5 justify-between py-2">
                    <label >Benefit</label>
                    <div className='w-3/5'>
                        <Select
                            mode='multiple'
                            style={{ width: '100%' }}
                            placeholder="Please select"
                            onChange={handleChangeBenefit}
                            options={options}
                            className='benefits'
                            defaultValue={dataCreate.benefits}
                        />
                    </div>
                </div>

                <div className=" flex items-center w-3/5 justify-between">
                    <label>
                        Remark
                    </label>
                    <div className='w-3/5'>
                        <TextAreaCustom
                            name="remark"
                            value={dataCreate.remark ?? ""}
                            onChange={(e: any) => dispatch(updateData({ remark: e.target.value }))}
                        />
                    </div>
                </div>

                <div className=" flex items-center w-3/5 justify-between">
                    <label>
                        HRM User Account
                    </label>
                    <div className='w-3/5'>
                        <Select
                            defaultValue=""
                            style={{ width: "100%" }}
                            disabled
                            options={[{ value: '', label: '' }]}
                        />
                    </div>
                </div>
                <div className='other-document mt-2'>
                    <div className="header">
                        <div className=" flex items-center w-3/5 justify-between">
                            <label>
                                Document
                            </label>
                            <div className='w-3/5'>
                                <Button
                                    variant="contained"
                                    component="label"
                                    sx={{
                                        color: "rgb(0, 145, 255)",
                                        backgroundColor: "rgb(237, 246, 255)",
                                        border: "1px dashed",
                                        width: "100px",
                                        boxShadow: "none",
                                        borderRadius: "6px",
                                        height: "32px",
                                        textTransform: "none",
                                        "&:hover": {
                                            boxShadow: "none",
                                            backgroundColor: "rgba(0, 145, 255, 0.08)"
                                        }
                                    }}
                                >
                                    <FileUploadOutlinedIcon />
                                    Upload
                                    <input type="file" accept="image/*,.pdf,.csv,.xlsx,.docx" hidden onChange={handleUploadFile} />
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="body">
                        <TableOrther />
                    </div>
                </div>
            </div>
        </div>
    )
}


export default OtherPage