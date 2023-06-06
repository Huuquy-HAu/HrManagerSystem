import React from 'react'
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { ICreateOrUpdate } from '../../../models/CreatOrUpdate';
import { removeOtherFormDataFile, selectCoU, updateData } from '../redux/CreateOrUpdateReducer';
import { ReactComponent as DeleteIcon } from '../../../scss/deleteIcon.svg'
import moment from 'moment'


interface Props {

}

const TableOrther = (props: Props) => {
    const header = [
        { field: "No", headerName: "No", width: 50 },
        { field: "document", headerName: "Document Name", width: 150 },
        { field: "created_at", headerName: "Created At", width: 150 },
        { field: "Action", headerName: "Action", width: 200 }
    ];
    const dispatch = useDispatch();
    const dataCreate: ICreateOrUpdate = useSelector(selectCoU)
    const handleDeleteDoc = (id: number) => {
        const newArray = dataCreate.documents.filter((document) => document.id !== id);
        dispatch(updateData({documents: newArray}));
        dispatch(removeOtherFormDataFile(id));
      };
    return (
        <TableContainer className=" h-200 ">
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
                            <TableCell key={index} style={{ maxWidth: `${column.width}px`, fontWeight: "bold" }}>
                                {column.headerName}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {dataCreate.documents.map((document, index) => {
                        return (
                            <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{document.document.split("/").pop()}</TableCell>
                                <TableCell>{moment(document.created_at).format("YYYY/MM/DD")}</TableCell>
                                <TableCell>
                                    <div className="flex  justify-center">
                                        <div className="min-w-100 "></div>
                                        <Button
                                            className="ml-2 h-6 rounded-md bg-red2 px-3 py-2 normal-case text-required hover:bg-red3 focus:outline-none "
                                          onClick={() => {
                                            handleDeleteDoc(document.id);
                                          }}
                                        >
                                            <DeleteIcon />
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

export default TableOrther