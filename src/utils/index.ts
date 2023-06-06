export const validUserNameRegex =
  /^([A-Za-z0-9]*\.?\s*[A-Za-z0-9]*){1,30}$/;

export const validPasswordRegex =
  /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])(?!.*\s).{8,16}$/


export const validEmailRegex =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/


export const validName =
  /^.{1,50}$/;

export const validKtpNo =
  /^.{1,20}$/;

export const validHomeAddress =
  /^.{1,100}$/;

export const validBankCardNo =
  /^.{1,30}$/;

export const getErrorMessageResponse = (response: any) => {
  if (typeof response?.message === 'string') {
    return response?.message;
  }

  if (response?.message?.details[0]) {
    return response?.message?.details[0]?.message;
  }

  return '';
};
