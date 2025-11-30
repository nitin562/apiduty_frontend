import { checkNotNull, request } from "../utilities/request.js"
import { ServerUrlsV1 } from "../config";
import { handleAddServiceError } from "./service.error.js";

export const handleStep1 = async(data, setErrors) =>{
    const nullValues = checkNotNull(data)
    if(nullValues){
        setErrors(nullValues)
        return
    }

    setErrors({})
    const url = ServerUrlsV1.addService
    const payload = JSON.stringify(data)
    const response = await request({
        url,
        method: "POST",
        body: payload,
    })

    const errors = handleAddServiceError(response)
    if(errors){
        setErrors(errors)
        return false
    }
    
    // Todo Save to Redux
    return true
}


