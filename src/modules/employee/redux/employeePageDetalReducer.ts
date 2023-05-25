import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../redux/store';

interface employeePage {
    employeePage: any[]
}

const initialState: employeePage = {
    employeePage: []
}

const employeePageSlice = createSlice({
    name: 'employeePage',
    initialState,
    reducers: {
        setEmployeePage:(state, action: PayloadAction<any[]>) => {
            state.employeePage = action.payload
        },
    },
});

export const {setEmployeePage} = employeePageSlice.actions


export const selectEmployeePageData = (state: RootState) => state.employeePageDetail.employeePage

export default employeePageSlice.reducer;
