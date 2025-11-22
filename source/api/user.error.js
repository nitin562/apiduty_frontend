import ErrorHandler, { ErrorCodes } from "../utilities/errorHandler.js"

export function handleLoginError(data){
    const errorHandler = new ErrorHandler(data)

    const errorCodes = {}
    errorCodes[ErrorCodes.EMAIL_NOT_FOUND] = "email"
    errorCodes[ErrorCodes.WRONG_PASSWORD] = "password"
    errorHandler.setValueErrorCodes(errorCodes)

    return errorHandler.handleError()
}

export function handleRegisterError(data){
    const errorHandler = new ErrorHandler(data)

    const errorCodes = {}
    errorCodes[ErrorCodes.USER_ALREADY_EXIST] = "email"
    errorHandler.setValueErrorCodes(errorCodes)

    return errorHandler.handleError()
}
