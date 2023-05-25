import { IloginParams, IloginValidate } from "../../models/LoginForm";
import { validPasswordRegex, validUserNameRegex } from "../../utils";

const validateEmail = (email: string) => {
    if (!email) {
        return 'Email Require';
    }

    if (!validUserNameRegex.test(email)) {
        return 'Maximum to 30 characters, allow "." and number';
    }

    return '';
};



const validatePassword = (password: string) => {
    if (!password) {
        return 'Password Require';
    }

    if (!validPasswordRegex.test(password)) {
        return '8-16 characters , contain at least 1 text , number , uppercase, special character.';
    }

    return '';
};



const validateCompany = (company_id: number | null) => {
    if (!company_id) {
        return 'Company Require';
    }
    return '';
};


export const validateLogin = (values: IloginParams)=> {
    return {
        username: validateEmail(values.username),
        password: validatePassword(values.password),
        company: validateCompany(values.company_id)
    };
};

