import { showGlobalModal } from "./ModalView";

export class ErrorCodes {
  // 400 Errors
  static EMAIL_NOT_FOUND = "EMAIL_NOT_FOUND";
  static WRONG_PASSWORD = "WRONG_PASSWORD";
  static USER_ALREADY_EXIST = "USER_ALREADY_EXIST";
  static BAD_REQUEST = "BAD_REQUEST";

  // 401 Errors
  static TOKEN_REQUIRED = "TOKEN_REQUIRED";
  static INVALID_TOKEN = "INVALID_TOKEN";
  static TOKEN_EXPIRED = "EXPIRED_TOKEN"; // handled in request
  static USER_DEACTIVATED = "USER_DEACTIVATED";
  static SESSION_TIMEOUT = "SESSION_TIMEOUT"; // handled in request
}


export default class ErrorHandler{
    codes = ErrorCodes
    tokenMessage = "Unable To Access this Resource. Try Later or Re-Login"
    tokenErrorCodes = [this.codes.INVALID_TOKEN, this.codes.TOKEN_REQUIRED, this.codes.USER_DEACTIVATED]

    modalErrorDetail = {
        // code: message for modal
    }

    valueErrorDetail = {
        // code: {name, customMessage:null} -> return name:message in output
    }

    constructor(response){
        this.response = response // json
    }

    setModalErrorCodes(code, message=null){
        this.modalErrorDetail[code] = message
    }

    setValueErrorCodes(codeWithName, codeWithMessage={}){
        if(!codeWithName){
            throw new Error("No Codes Provided")
        }
        const codeDetails = {}
        for(const code in codeWithName){
            const nameParam = codeWithName[code]
            codeDetails[code] = {
                name: nameParam,
                customMessage: null
            }

            if(code in codeWithMessage){
                const customMessage = codeWithMessage[code]
                codeDetails[code].customMessage = customMessage
            }
        }
        this.valueErrorDetail = {
            ...this.valueErrorDetail, ...codeDetails
        }
    }

    handleError(){
        const {code, data, message} = this.response
        if(code in this.tokenErrorCodes){
            console.error(this.tokenMessage)
            showGlobalModal("Unaccessible to User")
            return {}
        }

        if(code in this.modalErrorDetail){
            console.error(this.modalErrorDetail[code] || message)
        }

        if(code === this.codes.BAD_REQUEST){
            return data
        }

        const errors = {}
        if(code in this.valueErrorDetail){
            const {name, customMessage} = this.valueErrorDetail[code]
            errors[name] = customMessage || message 
        }

        return errors
    }
}