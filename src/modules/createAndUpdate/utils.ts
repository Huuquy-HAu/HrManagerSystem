import { ICreateOrUpdate, ICreateOrUpdateValidation } from "../../models/CreatOrUpdate";
import { validBankCardNo, validHomeAddress, validKtpNo, validName } from "../../utils";

const validateName = (name: string) => {
    if (!name) {
      return 'Please input Name';
    }
  
    if (!validName.test(name)) {
      return 'Maximum length is 50 characters';
    }
  
    return '';
};

const validateGender = (gender: number) => {
    if (!gender) {
      return 'Please input Gender';
    }
    return '';
};


const validateMotherName = (name: string) => {
    if (!validKtpNo.test(name)) {
        return 'Maximum length is 50 characters';
    }
    return '';
};


const validateDob = (Dob: string) => {
    if (!Dob) {
      return 'Please input Dob';
    }
    return '';
};


const validateKtp = (ktp: number) => {
    if (!ktp) {
      return 'Please input KTP No';
    }

    if (!validKtpNo.test(ktp.toString())) {
        return 'Maximum length is 50 characters';
    }
    return '';
};


const validateNc_id = ( id : number) => {
    if(!id){
        return 'Please input National Card ID'
    }

    if (!validKtpNo.test(id.toString())) {
        return 'Maximum length is 20 characters';
    }
}

const validateHomeAddress = (ad: string) => {
    if(!validHomeAddress.test(ad)) {
        return 'Maximum length is 100 characters'
    }
} 


const validateMobileNo = (mobile : number) => {
    if(!validKtpNo.test(mobile.toString())){
        return 'Maximum length is 20 characters';
    }
}

const validateTelNo = (mobile : number) => {
    if(!validKtpNo.test(mobile.toString())){
        return 'Maximum length is 20 characters';
    }
}

const validateBankCardNo = (mobile : number) => {
    if(!validBankCardNo.test(mobile.toString())){
        return 'Maximum length is 30 characters';
    }
}


const validateBankName = (name : string) => {
    if(!validHomeAddress.test(name)){
        return 'Maximum length is 100 characters';
    }
}

// export const validateCreate = (values: ICreateOrUpdate): ICreateOrUpdateValidation => {
//     return {
//       email: validateEmail(values.email),
//       password: validatePassword(values.password),
//     };
//   };
  



