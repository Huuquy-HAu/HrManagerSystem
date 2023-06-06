import React, { useRef, useState } from 'react'
import DatePicker from "react-datepicker";
import CalenderIcon from '../../../scss/Calendaricon.svg'
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Select from '@mui/material/Select';
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
import { addContractFile, pushContractsData, selectCoU, updateData } from '../redux/CreateOrUpdateReducer';
import { useDispatch, useSelector } from 'react-redux';
import { IContractUpload, ICreateOrUpdate } from '../../../models/CreatOrUpdate';
import TableContract from './TableContract';

interface Props {
}

interface contractFile {
    file: File | null,
    contractDate: string,
    contractName: string
}

const ContractInformation = (props: Props) => {
    const [seelectedDate, setSelectedDate] = useState<Date | null>(null);
    const dispatch = useDispatch()
    const dataCreate: ICreateOrUpdate = useSelector(selectCoU)
    const fileInputRef = useRef<any>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [contractUpload, setContractUpload] = useState<IContractUpload>({
        contract_date: '',
        action: 'add',
        document: '',
        document_file: [{}],
        employee_id: -1,
        name: '',
        id: null,
    })
    const [contractFile, setContractFile] = useState<contractFile>({
        file: null,
        contractDate: "",
        contractName: ""
    });
    const [errorMessage, setErrorMessage] = useState({
        contractDate: false,
        contractName: false,
        contractFile: false
    });

    const checkInput = (target: string, value: string) => {
        console.log(value);
        if (value) {
            setErrorMessage({ ...errorMessage, [target]: false });
            return;
        }
        setErrorMessage({ ...errorMessage, [target]: true });
    };

    const handleFileChangeImg = (event: any) => {
        const file = event.target.files && event.target.files[0];
        setSelectedFile(file);
        setContractFile({ ...contractFile, file: selectedFile || null })
        if (file) {
            setContractUpload({ ...contractUpload, id: file.lastModified })
            return;
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleDeleteImg = () => {
        setSelectedFile(null)
        checkInput("contractFile", '')
        setContractUpload({ ...contractUpload, id: null })
    }

    const handleUpAddImgContractTable = () => {
        console.log(selectedFile);
        if (contractUpload.contract_date && contractUpload.name && contractUpload.id) {
            dispatch(pushContractsData(contractUpload))
            dispatch(addContractFile({
                documents: [selectedFile],
                names: [contractUpload.name],
                contract_dates: [contractUpload.contract_date],
                modified_contracts: []
            }))
            setSelectedDate(null)
            setSelectedFile(null)
            setContractUpload({
                contract_date: '',
                action: 'add',
                document: '',
                document_file: [{}],
                employee_id: -1,
                name: '',
                id: null,
            })
        }
        console.log(errorMessage);
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
                                selected={dataCreate.contract_start_date ? new Date(dataCreate.contract_start_date) : null}
                                onChange={(date: any) => {
                                    dispatch(updateData({ contract_start_date: date ? new Date(date).toISOString().split('T')[0] : null }));
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
                                onChange={(event: any) => {
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
                                    selected={seelectedDate ? seelectedDate : null}
                                    onChange={(date: any) => {
                                        const dateString = new Date(date).toISOString()
                                        setSelectedDate(date);
                                        setContractUpload({ ...contractUpload, contract_date: dateString })
                                    }}
                                    dateFormat="yyyy/MM/dd"
                                    className={errorMessage.contractDate ? "h-8 w-full bg-red-100 pl-8 pt-2 outline-none" : "h-8 w-full bg-input pl-8 pt-2 outline-none"}
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
                                error={!errorMessage.contractName}
                                value={contractUpload.name}
                                disableUnderline={true}
                                className='bg-slate-200 p-2 w-3/5 rounded-md '
                                onChange={(e) => {
                                    setContractUpload({ ...contractUpload, name: e.target.value })
                                }}
                            />
                        </div>
                        <div className="btn-contract flex flex-col mt-3">
                            <input
                                type="file"
                                accept='image/*,.pdf,.csv,.xlsx,.docx'
                                style={{ display: 'none' }}
                                ref={fileInputRef}
                                onChange={handleFileChangeImg}
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
                                onClick={handleUpAddImgContractTable}
                            >
                                Add
                            </Button>
                            {selectedFile &&
                                <div className='file-name flex'>
                                    <p>{selectedFile.name}</p>
                                    <button onClick={handleDeleteImg}>
                                        x
                                    </button>
                                </div>}
                        </div>
                    </div>
                    <div className="body-right w-3/5">
                       <TableContract/>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default ContractInformation