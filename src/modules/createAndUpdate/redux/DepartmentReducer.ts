import { IContractUpload, IGetMarriage, IlistImgContract } from './../../../models/CreatOrUpdate';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../redux/store';
import { IDepartmanetData, IPositionData } from '../../../models/CreatOrUpdate';



interface IDepartment {
    deparmentData: IDepartmanetData[],
    positonData: IPositionData[],
    marriageData: IGetMarriage[],
    listContracts: IContractUpload[],
    listImgContract: IlistImgContract,
}

const initialState: IDepartment = {
    deparmentData: [{
        id: 0,
        name: '',
        code: '',
        company_id: 0,
        created_at: '',
    }],
    positonData: [{
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
    }],
    listContracts: [{
        contract_date: null,
        action: '',
        document: '',
        document_file: [],
        employee_id: -1,
        name: '',
        id: null
    }],
    listImgContract: {
        employee_id: null,
        names: [],
        contract_dates:[],
        documents:[],
        modified_contracts: []
    }
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
        setlistContract: (state, action: PayloadAction<IContractUpload>) => {
            state.listContracts.push(action.payload);
        },
        setlistImgContract:(state, action: PayloadAction<IlistImgContract>) => {
            state.listImgContract = action.payload;
        },
    },
});

export const { setDepartmentData, setPositionData, setMarriageData, setlistContract , setlistImgContract } = DepartmentSlice.actions

export const getDepartment = (state: RootState) => state.DepartmentData.deparmentData

export const getPosition = (state: RootState) => state.DepartmentData.positonData

export const getMarriage = (state: RootState) => state.DepartmentData.marriageData


export default DepartmentSlice.reducer;

