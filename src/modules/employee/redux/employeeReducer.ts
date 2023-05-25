import { IEmployee } from './../../../models/Employee';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../redux/store';

interface employeeDataSate {
    employeeDataList: IEmployee[]
}

const initialState: employeeDataSate = {
    employeeDataList: []
}

const employeeSlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {
        setEmployee:(state, action: PayloadAction<IEmployee[]>) => {
            state.employeeDataList = action.payload
        },
        addEmployee: (state, action: PayloadAction<IEmployee>) => {
            state.employeeDataList.push(action.payload);
        },
        removeEmployeesByIds: (state, action: PayloadAction<number[]>) => {
            state.employeeDataList = state.employeeDataList.filter((employee) => !action.payload.includes(employee.id));
        },
    },
});


export const { addEmployee, removeEmployeesByIds, setEmployee } = employeeSlice.actions


export const selectEmployeeData = (state: RootState) => state.employeeData.employeeDataList

export default employeeSlice.reducer;
