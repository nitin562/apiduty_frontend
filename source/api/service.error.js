import ErrorHandler, { ErrorCodes } from "../utilities/errorHandler.js"

export function handleAddServiceError(data){
    const errorHandler = new ErrorHandler(data)
    return errorHandler.handleError()
}
