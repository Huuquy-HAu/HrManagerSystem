import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../redux/store';
import { IContractUpload, ICreateOrUpdate, IImgCreatContract, IOtherFormDataFile } from '../../../models/CreatOrUpdate';


interface CreateOrUpdateSate {
    data: ICreateOrUpdate,
    employeeInforCheckError: boolean,
    contractFormError: boolean,
    salaryFormError: boolean,
    contractFileFormData: IImgCreatContract,
    OtherFormDataFile: IOtherFormDataFile
}

const initialState: CreateOrUpdateSate = {
    data: {
        name: '',
        card_number: null,
        gender: 0,
        mother_name: null,
        dob: '',
        pob: '',
        ktp_no: 0,
        nc_id: 0,
        home_address_1: null,
        home_address_2: null,
        mobile_no: null,
        tel_no: null,
        marriage_id: null,
        bank_account_no: null,
        bank_name: null,
        family_card_number: null,
        safety_insurance_no: null,
        health_insurance_no: null,
        department_id: null,
        position_id: null,
        shift: '',
        type: '',
        entitle_ot: false,
        meal_allowance_paid: false,
        operational_allowance_paid: true,
        attendance_allowance_paid: true,
        basic_salary: 0,
        audit_salary: 0,
        safety_insurance: 0,
        health_insurance: 0,
        meal_allowance: 0,
        contract_start_date: '',
        grade_id: null,
        grade: null,
        remark: null,
        benefits: [],
        account_user_id: 0,
        staff_id:'',
        contracts: [],
        documents: []
    },
    employeeInforCheckError: false,
    contractFormError: false,
    salaryFormError: false,
    contractFileFormData: {
        names: [],
        contract_dates: [],
        documents: [],
        modified_contracts: []
    },
    OtherFormDataFile: {
        documents: [],
        employee_id: 1
    }

}

const CoUSlice = createSlice({
    name: 'CreateOrUpdate',
    initialState,
    reducers: {
        setData: (state, action: PayloadAction<ICreateOrUpdate>) => {
            state.data = action.payload;
        },
        resetData: (state) => {
            state.data = initialState.data
        },

        updateData: (state, action: PayloadAction<Partial<ICreateOrUpdate>>) => {
            Object.assign(state.data, action.payload);
        },
        pushContractsData: (state, action: PayloadAction<IContractUpload>) => {
            state.data.contracts.push(action.payload)
        },
        addContractFile: (state, action: PayloadAction<IImgCreatContract>) => {
            const { names, contract_dates, documents } = action.payload;
            if (names[0] !== "") {
                state.contractFileFormData.names.push(...names);
                state.contractFileFormData.contract_dates.push(...contract_dates);
                state.contractFileFormData.documents.push(...documents)
            }
        },
        removeContractFile: (state, action: PayloadAction<number>) => {
            state.contractFileFormData.documents.splice(action.payload, 1);
            console.log(current(state.contractFileFormData.documents));
        },
        addOtherFormDataFile: (state, action: PayloadAction<IOtherFormDataFile>) => {
            const { documents } = action.payload;
            state.OtherFormDataFile.documents.push(...documents);
        },
        removeOtherFormDataFile: (state, action: PayloadAction<number>) => {
            let indexToRemove = state.OtherFormDataFile.documents.findIndex((obj) => obj.lastModified === action.payload);
            state.OtherFormDataFile.documents.splice(indexToRemove, 1);
        },
        removeAllFormData:(state) => {
            state.OtherFormDataFile = initialState.OtherFormDataFile
            state.contractFileFormData = initialState.contractFileFormData
        }


    },
});

export const {
    updateData,
    pushContractsData,
    addContractFile,
    removeContractFile,
    addOtherFormDataFile,
    removeOtherFormDataFile,
    resetData,
    setData,
    removeAllFormData
} = CoUSlice.actions

export const selectCoU = (state: RootState) => state.CreatOrUpdate.data

export const selectEmployeePageValid = (state: RootState) => state.CreatOrUpdate.employeeInforCheckError

export const selectContractFileFormData = (state: RootState) => state.CreatOrUpdate.contractFileFormData

export const selectOtherFileFormData = (state: RootState) => state.CreatOrUpdate.OtherFormDataFile


export default CoUSlice.reducer;

