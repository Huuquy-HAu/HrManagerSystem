export interface Icontracts {
    action: string,
    contract_date: string,
    document: string,
    document_file: any,
    employee_id: number,
    id: number | null,
    name: string,
}

export interface ICreateOrUpdate {
    name: string;
    card_number: number | null;
    gender: number;
    mother_name: string | null;
    dob: string | null;
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
    department_id?: number | null | string;
    position_id?: number | null | string;
    shift: string;
    type: string;
    entitle_ot: boolean;
    meal_allowance_paid: boolean;
    operational_allowance_paid: boolean;
    attendance_allowance_paid: boolean;
    basic_salary: number;
    audit_salary: number;
    safety_insurance: number;
    health_insurance: number;
    meal_allowance: number;
    contract_start_date: string | null;
    grade_id: number | null;
    grade: Igrade | null;
    remark: string | null;
    benefits: number[];
    account_user_id: number;
    staff_id: string;
    contracts: Icontracts[];
    documents: IOtherUpload[]

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

export interface IContractUpload {
    contract_date: any,
    action: string,
    document: string
    document_file: any[]
    employee_id: number,
    name: string,
    id: number | null
}


export interface IlistImgContract {
    employee_id: number | null,
    names: string[],
    contract_dates: Date[],
    documents: File[],
    modified_contracts: any[]
}

export interface IImgCreatContract {
    names: string[];
    contract_dates: Date[];
    documents: any;
    modified_contracts: string[];
}

export interface IImgCreatContractObj {
    names: string,
    contract_dates: Date,
    document: File,
    modified_contracts: string
}


export interface Ibenefits {
    code: string;
    company_id: number;
    created_at: Date;
    id: number;
    name: string;
    type: number;
    updated_at: string;
    value: string;
}

export interface Igrade {
    benefits: Ibenefits[];
    company_id: number;
    created_at: Date;
    id: number;
    name: string;
    prefix: string;
    updated_at: string;
}


export interface IOtherUpload {
    created_at: string;
    document: string;
    employee_id: number;
    id: number;
    updated_at: null;
};

export interface IOtherFormDataFile {
    employee_id: number | null;
    documents: File[];
}