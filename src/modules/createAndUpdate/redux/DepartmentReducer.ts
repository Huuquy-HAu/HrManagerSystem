import { IGetMarriage } from './../../../models/CreatOrUpdate';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../redux/store';
import { IDepartmanetData, IPositionData } from '../../../models/CreatOrUpdate';



interface IDepartment {
    deparmentData: IDepartmanetData[],
    positonData: IPositionData[],
    marriageData: IGetMarriage[]
}

const initialState: IDepartment = {
    deparmentData: [{
        id: 0,
        name: '',
        code: '',
        company_id: 0,
        created_at: '',
    }],
    positonData:  [{
        id: 0,
        name: '',
        code: '',
        company_id: 0,
        created_at: '',
    }],
    marriageData: [{
        id: 0,
        name: '',
        code: '',
        company_id: 0
    }]
}

const DepartmentSlice = createSlice({
    name: 'Deparment',
    initialState,
    reducers: {
        setDepartmentData: (state, action: PayloadAction<IDepartmanetData[]>) => {
            state.deparmentData = action.payload;
        },
        setPositionData: (state, action: PayloadAction<IPositionData[]>) => {
            state.positonData = action.payload;
        },
        setMarriageData: (state, action: PayloadAction<IPositionData[]>) => {
            state.marriageData = action.payload;
        },
    },
});

export const { setDepartmentData, setPositionData , setMarriageData } = DepartmentSlice.actions

export const getDepartment = (state: RootState) => state.DepartmentData.deparmentData

export const getPosition = (state: RootState) => state.DepartmentData.positonData

export const getMarriage = (state: RootState) => state.DepartmentData.marriageData


export default DepartmentSlice.reducer;

