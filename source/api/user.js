import { ServerUrlsV1 } from "../config";
import { request } from "../utilities/request";

export async function loginHelper(email, password){
    const url = ServerUrlsV1.login
    const payload = JSON.stringify({
        email, password
    })

    const response = await request({
        url,
        method: "POST",
        secure: false,
        body: payload,
    })
    return response
}

export async function RegisterHelper(username, email, password){
    const url = ServerUrlsV1.register
    const payload = JSON.stringify({
        email, password, username
    })

    const response = await request({
        url,
        method: "POST",
        secure: false,
        body: payload,
    })
    return response
}

export async function pingHelper(){
    const url = ServerUrlsV1.ping
    const response = await request({
        url,
        method: "GET",
        doNavigate: false
    })

    // invalid token got
    
    return response
}
