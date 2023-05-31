export interface Icontracts {
    action:string,
    contract_date:string,
    document:string,
    document_file:any,
    employee_id:number,
    id:number,
    name:string,
}

export interface ICreateOrUpdate {
    name: string;
    card_number: number | null;
    gender: number;
    mother_name: string | null;
    dob: string;
    pob: string;
    ktp_no: number;
    nc_id: number;
    home_address_1: string | null;
    home_address_2: string | null;
    mobile_no: number | null;
    tel_no: number | null;
    marriage_id: number | null;
    bank_account_no: number | null;
    bank_name: string | null;
    family_card_number: number | null;
    safety_insurance_no: number | null;
    health_insurance_no: number | null;
    department_id: number;
    position_id: number | null;
    shift: string;
    type: string;
    entitle_ot: string;
    meal_allowance_paid: string;
    operational_allowance_paid: string;
    attendance_allowance_paid: string;
    basic_salary: number;
    audit_salary: number;
    safety_insurance: number;
    health_insurance: number;
    meal_allowance: number;
    contract_start_date: string;
    grade_id: number | null;
    remark: string | null;
    benefits: number[];
    account_user_id: number;
    contracts: Icontracts[],
}

export interface ICreateOrUpdateValidation {
    name: string;
    card_number: string;
    gender: string;
    mother_name: string | null;
    dob: string;
    pob: string;
    ktp_no: string;
    nc_id: string;
    home_address_1: string | null;
    home_address_2: string | null;
    mobile_no: string;
    tel_no: string;
    marriage_id: string;
    bank_account_no: string;
    bank_name: string | null;
    family_card_number: string;
    safety_insurance_no: string;
    health_insurance_no: string;
    department_id: string;
    position_id: string;
    shift: string;
    type: string;
    entitle_ot: string;
    meal_allowance_paid: string;
    operational_allowance_paid: string;
    attendance_allowance_paid: string;
    basic_salary: string;
    audit_salary: string;
    safety_insurance: string;
    health_insurance: string;
    meal_allowance: string;
    contract_start_date: string;
    grade_id: string;
    remark: string | null;
    benefits: string;
    account_user_id: string;
}


export interface IDepartmanetData {
    id: number,
    name: string,
    code: string,
    company_id: number,
    created_at: string
}


export interface IPositionData {
    id: number,
    name: string,
    code: string,
    company_id: number,
    created_at: string,
}


export interface IGetMarriage {
    id: number,
    name: string,
    code: string,
    company_id: number
}