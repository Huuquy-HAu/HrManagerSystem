import React from 'react'
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { ICreateOrUpdate } from '../../../models/CreatOrUpdate';
import { useDispatch, useSelector } from 'react-redux';
import { selectCoU, updateData } from '../redux/CreateOrUpdateReducer';
import deleteIcon from '../../../scss/deleteIcon.svg'

interface Props {

}

const TableContract = (props: Props) => {
    const dataCreate: ICreateOrUpdate = useSelector(selectCoU)
    const dispatch = useDispatch()
    const handleDeleteContractFile = (id: number, index: number) => {
        const newArray = dataCreate.contracts.filter((contract) => contract.id !== id);
        dispatch(updateData({contracts: newArray}));
    };
    const header = [
        { field: "id", headerName: "No", width: 50 },
        { field: "name", headerName: "Contract Name", width: 150 },
        { field: "contract_date", headerName: "Sign Date", width: 150 },
        { field: "Action", headerName: "Action.", width: 200 }
    ];
    return (
        <TableContainer className="mx-3 h-200 ">
            <Table className="rounded-lg border border-white" size="small">
                <TableHead sx={{ borderRadius: "12px" }}>
                    <TableRow
                        sx={{
                            "& th": { backgroundColor: "rgb(236,238,240)", border: "1px white solid", fontSize: "14px" },
                            "& th:first-of-type": { borderTopLeftRadius: "12px" },
                            "& th:last-child": { borderTopRightRadius: "12px" }
                        }}
                    >
                        {header.map((column, index) => (
                            <TableCell key={index} style={{ minWidth: `${column.width}px`, fontWeight: "bold" }}>
                                {column.headerName}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {dataCreate.contracts.map((contract, index) => {
                        return (
                            <TableRow>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{contract.name}</TableCell>
                                <TableCell>{contract.contract_date}</TableCell>
                                <TableCell>
                                    <div className="flex  justify-center">
                                        <div className="min-w-100 "></div>
                                        <Button
                                            className="ml-2 h-6 rounded-md bg-red2 px-3 py-2 normal-case text-required hover:bg-red3 focus:outline-none "
                                            onClick={() => {
                                                if (contract.id !== null) {
                                                    handleDeleteContractFile(contract.id, index);
                                                }
                                            }}
                                        >
                                            <img src={deleteIcon} alt="" />
                                            <span className="ml-2">Delete</span>
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default TableContract