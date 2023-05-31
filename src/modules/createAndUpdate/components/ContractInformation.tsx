import React, { useRef, useState } from 'react'
import DatePicker from "react-datepicker";
import CalenderIcon from '../../../scss/Calendaricon.svg'
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import CustomInputSelect, { customPaperProps } from './StyleSelected';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { TableCell } from '@mui/material';
import { selectCoU, updateData } from '../redux/CreateOrUpdateReducer';
import { useDispatch, useSelector } from 'react-redux';
import { ICreateOrUpdate } from '../../../models/CreatOrUpdate';

interface Props {

}

const ContractInformation = (props: Props) => {
    const [seelectedDate, setSelectedDate] = useState<Date | null>(null);
    const [seelectedDate2, setSelectedDate2] = useState<Date | null>(null);
    const [employeeType, setEmployeeType] = useState<any>()
    const dispatch = useDispatch()
    const dataCreate : ICreateOrUpdate = useSelector(selectCoU)



    const fileInputRef = useRef<any>(null);
    const [selectedFile, setSelectedFile] = useState<any>(null);

    const handleFileChange = (event: any) => {
        console.log(event);
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleChange = (event: SelectChangeEvent) => {
        setEmployeeType(event.target.value)
    };


    const handleDelete = () => {
        setSelectedFile(null)
    }


    const columns = [
        { field: "NIK", headerName: "No", width: 50 },
        { field: "Name", headerName: "Contract Name", width: 150 },
        { field: "Gender", headerName: "Sign Date", width: 150 },
        { field: "BankCardNo", headerName: "Action", width: 220 },

    ];
    return (
        <div className='ContractInformationPage bg-white p-3 rounded-xl'>
            <div className="header flex justify-between">
                <h5 className='text-xl font-medium'>Contract Information</h5>
                <div>Required (<span className='text-red-500 text-xl'>*</span>) </div>
            </div>
            <hr className='my-2' />
            <div className="body-Contract px-4 pb-4">
                <div className='max-w-md'>
                    <div className='flex justify-between items-center'>
                        <label>
                            Date Start (<span className='text-red-500 text-xl'>*</span>)
                        </label>
                        <div className='relative  flex h-12 w-3/5 flex-row items-center rounded-md bg-input outline-none'>
                            <DatePicker
                                selected={new Date(dataCreate.contract_start_date)}
                                onChange={(date: any) => {
                                    dispatch(updateData({ contract_start_date: new Date(date).toISOString().split('T')[0] }));
                                }}
                                dateFormat="yyyy/MM/dd"
                                className="h-8 w-full bg-input pl-8 pt-2 outline-none"
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
                    <div className='flex justify-between items-center py-1'>
                        <label>
                            Employee Type  (<span className='text-red-500 text-xl'>*</span>)
                        </label>
                        <div className='w-3/5' >
                            <Select
                                value={dataCreate.type}
                                onChange={(event:any) => {
                                    setEmployeeType(event.target.value)
                                    dispatch(updateData({ type: event.target.value }));
                                }}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                                className="h-12 rounded-md bg-input px-2 py-4 outline-none w-full"
                                input={<CustomInputSelect />}
                                placeholder='Choose Gender'
                                MenuProps={{
                                    PaperProps: customPaperProps
                                }}
                            >
                                <MenuItem value={0}>Permanent</MenuItem>
                                <MenuItem value={1}>Part-time</MenuItem>
                                <MenuItem value={2}>Contract</MenuItem>
                            </Select>
                        </div>
                    </div>
                </div>
            </div>
            <div className="contract">
                <div className="header-contract">
                    Contract:
                </div>

                <div className="des-contract">
                    Please upload pdf, png, xlsx, docx file format!
                </div>
                <hr />

                <div className="body-contract flex">
                    <div className="body-left w-2/5">
                        <div className='flex justify-between py-1 items-center' >
                            <span>Contract Date</span>
                            <div className='relative  flex h-12 w-3/5 flex-row items-center rounded-md bg-input outline-none'>
                                <DatePicker
                                    selected={seelectedDate}
                                    onChange={(date: any) => {
                                        console.log(date);
                                        setSelectedDate(date);
                                    }}
                                    dateFormat="yyyy/MM/dd"
                                    className="h-8 w-full bg-input pl-8 pt-2 outline-none"
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
                        <div className='flex justify-between py-1 items-center'>
                            <span>Contract Name</span>
                            <Input
                                disableUnderline={true}
                                className='bg-slate-200 p-2 w-3/5 rounded-md'
                            />
                        </div>
                        <div className="btn-contract flex flex-col mt-3">
                            <input
                                type="file"
                                accept='image/*,.pdf,.csv,.xlsx,.docx'
                                style={{ display: 'none' }}
                                ref={fileInputRef}
                                onChange={handleFileChange}
                            />
                            <Button
                                variant="contained"
                                component="label"
                                onClick={handleButtonClick}
                                sx={{
                                    color: "rgb(0, 145, 255)",
                                    backgroundColor: "rgb(237, 246, 255)",
                                    border: "1px dashed",
                                    width: "48%",
                                    marginBottom: "12px",
                                    boxShadow: "none",
                                    minWidth: "195px",
                                    borderRadius: "6px",
                                    height: "48px",
                                    textTransform: "none",
                                    "&:hover": {
                                        boxShadow: "none",
                                        backgroundColor: "rgba(0, 145, 255, 0.08)"
                                    }
                                }}
                            >
                                <FileUploadOutlinedIcon />
                                Upload File
                            </Button>

                            <Button
                                variant="contained"
                                component="label"
                                sx={{
                                    color: "rgb(234, 251, 246)",
                                    backgroundColor: "rgb(105, 217, 193)",
                                    width: "48%",
                                    marginBottom: "12px",
                                    boxShadow: "none",
                                    minWidth: "195px",
                                    borderRadius: "6px",
                                    height: "48px",
                                    textTransform: "none",
                                    "&:hover": {
                                        boxShadow: "none",
                                        backgroundColor: "rgb(54, 215, 180)"
                                    }
                                }}
                            >
                                Add
                            </Button>

                            {/* {selectedFile && <p>{selectedFile.name}</p>} */}
                            {selectedFile &&
                                <div className='file-name flex'>
                                    <p>{selectedFile.name}</p>
                                    <button onClick={handleDelete}>
                                        x
                                    </button>
                                </div>}
                        </div>
                    </div>
                    <div className="body-right w-3/5">
                        <TableContainer className="w-3/4 px-2 ">
                            <Table
                                sx={{
                                    "& .MuiTableRow-root:hover": {
                                        backgroundColor: "black"
                                    }
                                }}
                                style={{
                                    borderRadius: 8,
                                }}
                                size='small'
                                stickyHeader
                            >
                                <TableHead>
                                    <TableRow
                                        sx={{
                                            "& th:first-child": { borderTopLeftRadius: "12px" },
                                            "& th:last-child": { borderTopRightRadius: "12px" }
                                        }}
                                    >
                                        {columns.map((column, index) => (
                                            <TableCell key={index} style={{ minWidth: `${column.width}px` }}>
                                                {column.headerName}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                    <TableBody>

                                    </TableBody>
                                </TableHead>
                            </Table>

                        </TableContainer>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default ContractInformation