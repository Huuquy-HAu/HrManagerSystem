import React from 'react'
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Box from "@mui/material/Box";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useState } from "react";
import { Alert, Button, Checkbox, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { IEmployee } from '../../../models/Employee';
import addIcon from '../../../scss/addIcon.svg'
import deleteIcon from '../../../scss/deleteIcon.svg'
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import { useDispatch } from 'react-redux';
import { removeEmployeesByIds } from '../redux/employeeReducer';
import CircularProgress from "@mui/material/CircularProgress";
import { ReactComponent as NoData } from "../../../scss/NoData.svg";


interface Props {
    dataEmployee: IEmployee[],
    deleteData: (dataId: number[]) => void,
    loading: boolean
}

interface IData {
    NIK: string;
    Name: string;
    Gender: string;
    BankCardNo: string;
    BankAccountNo: string;
    FamilyCardNo: string;
    MarriageStatus: string;
    MotherName: string;
    Placeofbirth: string;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 355,
    bgcolor: 'background.paper',
    borderRadius: "8px",
    boxShadow: 24,
    p: "20px 24px 30px 24px",
};


const TableForm = (props: Props) => {
    const { dataEmployee, deleteData, loading } = props
    const [selected, setSelected] = useState<number[]>([]);
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleOpenAlert = () => setOpenAlert(true);
    const handleCloseAlert = () => setOpenAlert(false);
    const dispatch = useDispatch()

    const columns = [
        { field: "NIK", headerName: "NIK", width: 150 },
        { field: "Name", headerName: "Name", width: 200 },
        { field: "Gender", headerName: "Gender", width: 120 },
        { field: "BankCardNo", headerName: "Bank Card No.", width: 200 },
        { field: "BankAccountNo", headerName: "Bank Account No.", width: 200 },
        { field: "FamilyCardNo", headerName: "Family Card No.", width: 200 },
        { field: "MarriageStatus", headerName: "Marriage Status", width: 150 },
        { field: "MotherName", headerName: "Mother Name", width: 200 },
        { field: "Placeofbirth", headerName: "Place of birth", width: 200 },
        { field: "Dateofbirth", headerName: "Date of birth", width: 200 },
        { field: "HomeAddress", headerName: "Home Address", width: 300 },
        {
            field: "NationalCardIDNo",
            headerName: "National Card ID No.",
            width: 200
        },
        { field: "DateStart", headerName: "Date Start", width: 200 },
        { field: "FirstContract", headerName: "First Contract", width: 200 },
        { field: "SecondContract", headerName: "Second Contract", width: 200 },
        { field: "EndContract", headerName: "End Contract", width: 200 },
        { field: "Department", headerName: "Department", width: 200 },
        { field: "EmployeeType", headerName: "Employee Type", width: 200 },
        { field: "SalaryRp", headerName: "Salary Rp.", width: 200 },
        { field: "Position", headerName: "Position", width: 200 },
        { field: "OTPaid", headerName: "O/T Paid", width: 150 },
        { field: "Mealpaid", headerName: "Meal paid", width: 150 },
        { field: "MealRp", headerName: "Meal Rp.", width: 150 },
        { field: "Grading", headerName: "Grading", width: 150 }
    ];
    // checkbox
    const isSelected = (id: number) => selected.indexOf(id) !== -1;
    const handleClick = (event: React.MouseEvent, id: number) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected: number[] = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }
        setSelected(newSelected);

    };

    const handelDelete = () => {
        handleClose()
        deleteData(selected)
        dispatch(removeEmployeesByIds(selected))
        setSelected([])
        handleOpenAlert()
    }


    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = dataEmployee.map((n) => n.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };
    return (
        <div className='table-formm'>
            <Box className="bg-white h-full rounded-xl p-2">
                <div className="flex justify-end">
                    <Button
                        startIcon={<img src={addIcon} />}
                        className="table-btn-add"
                        onClick={() => {navigate('/employee/create-or-update')}}
                    >
                        Add
                    </Button>
                    <Button
                        disabled={!!!selected.length}
                        startIcon={!!!selected.length ? <img src={deleteIcon} /> : <img src={deleteIcon} style={{ color: 'gray' }} />}
                        className={!!!selected.length ? 'table-btn-delete-disable' : 'table-btn-delete-checked'}
                        onClick={handleOpen}
                    >
                        Delete
                    </Button>
                </div>
                <hr
                    style={{
                        margin: "10px 0px",
                        flexShrink: "0",
                        borderWidth: "0px 0px thin",
                        borderStyle: "solid",
                        borderColor: "rgba(193, 200, 205, 0.24)"
                    }}
                />
                <TableContainer className="w-3/4 h-600 ">
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
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        color="primary"
                                        inputProps={{
                                            "aria-label": "select all desserts"
                                        }}
                                        indeterminate={selected.length > 0 && selected.length < dataEmployee.length}
                                        indeterminateIcon={<IndeterminateCheckBoxIcon sx={{ color: "rgb(48 164 108)" }} />}
                                        checked={dataEmployee.length > 0 && selected.length === dataEmployee.length}
                                        onChange={handleSelectAllClick}
                                    />
                                </TableCell>
                                {columns.map((column, index) => (
                                    <TableCell key={index} style={{ minWidth: `${column.width}px` }}>
                                        {column.headerName}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {dataEmployee.map((row, index) => {
                                const isItemSelected = isSelected(row.id);
                                const labelId = `enhanced-table-checkbox-${index}`;
                                return (
                                    <TableRow
                                        hover
                                        onClick={(event) => handleClick(event, row.id)}
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.id}
                                        selected={isItemSelected}
                                        sx={{
                                            cursor: "pointer",
                                        }}
                                        onDoubleClick={() => {
                                            console.log(row.id);
                                            navigate(`/employee/create-or-update/${row.id}`);
                                        }}
                                        className={selected.includes(row.id) ? 'selected' : ''}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                color="primary"
                                                checked={isItemSelected}
                                                inputProps={{
                                                    "aria-labelledby": labelId
                                                }}
                                                className={isItemSelected ? 'checkbox-checked' : 'checkbox-unchecked'}
                                            />
                                        </TableCell>
                                        <TableCell width={300}>{row.staff_id}</TableCell>
                                        <TableCell>{row.name}</TableCell>
                                        <TableCell>{row.gender ? 'Female' : 'Male'}</TableCell>
                                        <TableCell>{row.card_number}</TableCell>
                                        <TableCell>{row.bank_account_no}</TableCell>
                                        <TableCell>{row.family_card_number}</TableCell>
                                        <TableCell>{row.marriage_code}</TableCell>
                                        <TableCell>{row.mother_name}</TableCell>
                                        <TableCell>{row.pob}</TableCell>
                                        <TableCell>{row.dob}</TableCell>
                                        <TableCell>{row.home_address_1}</TableCell>
                                        <TableCell>{row.nc_id}</TableCell>
                                        <TableCell>{row.contract_start_date}</TableCell>
                                        {row?.contracts.length > 0 ? (
                                            <TableCell>{row.contracts[0].contract_date}</TableCell>
                                        ) : (
                                            <TableCell></TableCell>
                                        )}
                                        {row?.contracts.length > 1 ? (
                                            <TableCell>{row.contracts[1].contract_date}</TableCell>
                                        ) : (
                                            <TableCell></TableCell>
                                        )}
                                        {row?.contracts.length > 2 ? <TableCell>??</TableCell> : <TableCell></TableCell>}
                                        <TableCell>{row.department_id}</TableCell>
                                        <TableCell>{row.basic_salary}</TableCell>
                                        <TableCell>{row.position_name}</TableCell>
                                        <TableCell>{row.position_name}</TableCell>
                                        <TableCell>???</TableCell>
                                        <TableCell>???</TableCell>
                                        <TableCell>{row.meal_allowance}</TableCell>
                                        <TableCell>{row.grade_name}</TableCell>
                                    </TableRow>
                                );
                            })}
                            {!loading && dataEmployee.length === 0 && (
                                <div className="absolute flex flex-col inset-0 justify-center items-center">
                                    <NoData />
                                    <div className="mt-30 font-normal leading-5 text-base text-center">
                                        No Data
                                    </div>
                                    <div className="mt-5 leading-6 text-base tracking-tighter font-sans font-normal text-center text-gray-500">

                                        Your record will be synced here once it ready
                                    </div>
                                </div>

                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                {loading && (
                    <div className="absolute inset-0 flex h-full bg-loading justify-center ">
                        <CircularProgress size={32} sx={{ margin: "auto" }} />
                    </div>
                )}
                <div>
                </div>
            </Box>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className="header" style={{ display: 'flex', justifyContent: "space-between" }}>
                        <div className="header-left">
                            <Typography id="modal-modal-title" variant="h6" component="h3">
                                Delete
                            </Typography>
                        </div>
                        <div className="header-right">
                            <IconButton aria-label="delete" onClick={handleClose}>
                                <ClearIcon />
                            </IconButton>
                        </div>
                    </div>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Are you sure you want to delete?
                    </Typography>

                    <div className="footer">
                        <Button variant="text">
                            No
                        </Button>
                        <Button variant="contained" onClick={handelDelete}>
                            Yes
                        </Button>
                    </div>
                </Box>
            </Modal>

            <Snackbar
                open={openAlert}
                autoHideDuration={3000}
                onClose={handleCloseAlert}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
                    Success
                </Alert>
            </Snackbar>
        </div>
    )
}

export default TableForm