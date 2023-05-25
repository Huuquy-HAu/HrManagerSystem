export interface IloginParams {
    username: string,
    password : string,
    company_id : number | null
}

export interface IloginValidate {
    username: string,
    password : string,
    company_id : string
}

