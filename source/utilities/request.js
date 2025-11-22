import { ServerUrlsV1 } from "../config"
import navigate from "../navigation"
import { ErrorCodes } from "./errorHandler"
import { DeviceStorage } from "./storage"
import {store} from "../redux/store.js"
import { showGlobalModal } from "./ModalView.jsx"
import { setTokens } from "../redux/slices/user.js"

export function checkNotNull(payload){
    const errors = {}
    for(let name in payload){
        if(!payload[name]){
            errors[name] = `Field is Required`
        }
    }
    return errors
}

async function fetchWithTimeout(url, options, timeout) {
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("TimeoutError")), timeout*1000)
    )
  ]);
}

export async function request({url, method, secure=true, headers={}, body=null, query=null, json=true, doNavigate=true, retries=1, timeout=40}){
    const options = {
        method,
        headers: {
            "content-type": "application/json",
        },
        body
    }

    if(headers){
        options.headers = {
            ...options.headers, ...headers
        }
    }

    if(secure){
        const token = store.getState().user.accessToken
        if(!token){
            showGlobalModal("Authorization is missing. Please Relogin")
            return null
        }
        options.headers.Authorization = `Bearer ${token}` //fetch from redux
    }

    if(query){
        // query must be URLSearch Params Object
        url = `${url}?${query.toString()}`
    }
    console.log(url, options)

    let response = null
    try{
        response = await fetchWithTimeout(url, options, timeout)
    }
    catch(err){
        console.log("Caught error:", err.name, err.message);
        if (err.name === "TimeoutError") {
        } else {
            showGlobalModal(`Network Error: ${err.message}`);
        }
        return null
    }
    console.log(response)
    if(!json){
        return response
    }
    
    let jsonResponse = null
    try{
        jsonResponse = await response.json()
    }
    catch(err){
        console.log(`[Fetch API RAW ERROR] - ${err}`)
        showGlobalModal("Data Parsing Problem")
        return null
    }

    const {code} = jsonResponse
    if(code === ErrorCodes.TOKEN_EXPIRED){
       const isSessionExtended = await extendSession()
       if(!isSessionExtended || retries>=3){
            showGlobalModal("Session is Expired. Please Relogin.")
            if(doNavigate){
                navigate("login")
            }
            return null
       }
       return request({
        url, 
        method, 
        secure, 
        headers, 
        body, 
        query, 
        json, 
        retries: retries+1
        })
    }

    return {
        headers: response.headers,
        result: jsonResponse,
        statusCode: response.status
    }
}

async function extendSession(){
    const url = ServerUrlsV1.extendSession
    const token = store.getState().refreshToken
    const payload = JSON.stringify({
        refreshToken: token
    })

    let response = null
    try{
        response = await fetchWithTimeout(url, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: payload
            }, 40000)
    }catch(err){
        return false
    }
    
    const {code} = await response.json()
    if(code === ErrorCodes.SESSION_TIMEOUT){
        return false
    }
    const accessToken = response.headers.get("access-token")
    const refreshToken = response.headers.get("refresh-token")

    DeviceStorage.insert("session", {accessToken, refreshToken})
    store.dispatch(setTokens({accessToken, refreshToken}))
    return true
}
