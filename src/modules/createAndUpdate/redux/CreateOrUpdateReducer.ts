import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../redux/store';
import { ICreateOrUpdate } from '../../../models/CreatOrUpdate';


interface CreateOrUpdateSate {
    data: ICreateOrUpdate
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
        department_id: 0,
        position_id: null,
        shift: '',
        type: '',
        entitle_ot: '',
        meal_allowance_paid: '',
        operational_allowance_paid: '',
        attendance_allowance_paid: '',
        basic_salary: 0,
        audit_salary: 0,
        safety_insurance: 0,
        health_insurance: 0,
        meal_allowance: 0,
        contract_start_date: '',
        grade_id: null,
        remark: null,
        benefits: [],
        account_user_id: 0,
        contracts:[]
    },
}

const CoUSlice = createSlice({
    name: 'CreateOrUpdate',
    initialState,
    reducers: {
        setData: (state, action: PayloadAction<ICreateOrUpdate>) => {
            state.data = action.payload;
        },
        updateData: (state, action: PayloadAction<Partial<ICreateOrUpdate>>) => {
            Object.assign(state.data, action.payload);
        },
    },
});

export const { updateData } = CoUSlice.actions

export const selectCoU = (state: RootState) => state.CreatOrUpdate.data


export default CoUSlice.reducer;

